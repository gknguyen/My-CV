package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
)

func main() {
	port, isExist := os.LookupEnv("PORT")

	if !isExist {
		port = "4000"
	}

	clientFiles := http.FileServer(http.Dir("./build"))

	http.Handle("/", clientFiles)

	fmt.Printf("Starting server at http://127.0.0.1:" + port + "\n")

	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatal(err)
	}
}
