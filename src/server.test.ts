import supertest from "supertest";

import { prismaMock } from "./lib / prisma/client.mock";

import app from "./app";

const request = supertest(app);

test("GET /planets", async () => {
    const planets = [
        {
            id: 2,
            name: "Venus",
            description: null,
            diameter: 5678,
            moons: 2,
            createdAt: "2022-07-20T07:47:46.219Z",
            updatedAt: "2022-07-20T07:47:12.464Z",
        },
        {
            id: 1,
            name: "Mercury",
            description: null,
            diameter: 1234,
            moons: 12,
            createdAt: "2022-07-19T16:08:22.763Z",
            updatedAt: "2022-07-20T07:47:57.055Z",
        },
    ];
    // @ts-ignore
    prismaMock.planet.findMany.mockResolvedValue(planets);

    const response = await request
        .get("/planets")
        .expect(200)
        .expect("Content-Type", /application\/json/);

    expect(response.body).toEqual(planets);
});

test("POST /planets", async () => {
    const planet = {
        id: 1,
        name: "Mercury",
        diameter: 1234,
        moons: 12,
    };

    const response = await request
        .post("/planets")
        .send(planet)
        .expect(201)
        .expect("Content-Type", /application\/json/);

    expect(response.body).toEqual(planet);
});
