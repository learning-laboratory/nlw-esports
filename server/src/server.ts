import express from "express";

const app = express();

app.get("/users", (request, response) => {
    console.log("users");
    return response.json([
        {
            id: 1,
            name: "Mario"
        }
    ]);
});

app.listen(4000);