package main

import (
	"fmt"
	"log"
	"os"

	"slices"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)

type Todo struct {
	ID        int    `json:"id"`
	Completed bool   `json:"completed"`
	Body      string `json:"body"`
}

func main() {
	app := fiber.New()

	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading env")
	}

	PORT := os.Getenv("PORT")

	todos := []Todo{}

	//fiber.Map is just a shorthand for map[string]interface{}

	app.Get("/api/todos", func(c *fiber.Ctx) error {
		return c.Status(200).JSON(todos)
	})

	//create a todo
	app.Post("/api/todos", func(c *fiber.Ctx) error {
		todo := &Todo{} //since no values, will create with empty values

		if err := c.BodyParser(todo); err != nil {
			return err
		}

		if todo.Body == "" {
			return c.Status(400).JSON(fiber.Map{
				"error": "Body is required",
			})
		}

		todo.ID = len(todos) + 1
		todos = append(todos, *todo)

		return c.Status(201).JSON(todo)
	})

	//update a todo
	app.Patch("/api/todos/:id", func(c *fiber.Ctx) error {
		id := c.Params("id")

		for i, todo := range todos {
			if (fmt.Sprint(todo.ID)) == id {
				todos[i].Completed = true
				return c.Status(200).JSON(todos[i])
			}
		}

		return c.Status(404).JSON(fiber.Map{
			"error": "Todo not found",
		})
	})

	//delete a todo
	app.Delete("/api/todos/:id", func(c *fiber.Ctx) error {
		id := c.Params("id")

		for i, todo := range todos {
			if fmt.Sprint(todo.ID) == id {
				todos = slices.Delete(todos, i, i+1)
				return c.Status(204).JSON(fiber.Map{
					"success": "Todo deleted successfully",
				})
			}
		}

		return c.Status(404).JSON(fiber.Map{
			"error": "Todo not found",
		})
	})

	log.Fatal(app.Listen(":" + PORT))
}
