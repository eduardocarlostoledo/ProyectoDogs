const request = require('supertest');
const server = require("../src/app")
const { Dog } = require('../src/db');
const agent = request(server);

xdescribe("GET /dogs", () => {
    test("status 200 con todos los perros", async () => {
        const response = await agent.get("/dogs");
        expect(response.statusCode).toBe(200)
        expect(Array.isArray(response.body)).toBe(true)
        expect(response.body).toHaveLength(response.body.length)
    })

    test("status 200 con el/los perros segun el nombre pasado por query", async () => {
        const response = await agent.get("/dogs?name=Alaskan");
        expect(response.statusCode).toBe(200)
        expect(response.body[0].name).toBe('Alaskan Husky')
    })
    test("status 200 no encuentra el nombre por query y un json = []", async () => {
        const response = await agent.get("/dogs?name=asdasdasd");
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual([])
    })

    test("status 200 no encuentra el nombre por query y un json = []", async () => {
        const response = await agent.get("/dogs?name=123412");
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual([])
    })
})

xdescribe("GET /dogs/:idRaza", () => {
    test("status 200 si no le paso nada por params con un json = []", async () => {
        const response = await agent.get("/dogs/:idRaza")
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual([])
    })
})
let perroPrueba = {
    name: "tomas123",
    height_min: 1,
    height_max: 2,
    weight_min: 1,
    weight_max: 2,
    year_min: 1,
    year_max: 2,
    image: 'https://www.clarin.com/img/2021/07/24/llegan-a-pesar-mas-de___yqKyyB2BQ_720x0__1.jpg',
    temperament: "Curious",
}

let perroPrueba2 = {
    height_min: 1,
    height_max: 2,
    weight_min: 1,
    weight_max: 2,
}

describe("POST /dogs", () => {

    // test("status 200 si creamos un perro y sale todo OK", async () => {
    //     const response = await agent.post("/dogs").send(perroPrueba)
    //     expect(response.statusCode).toBe(200)
    //     expect(response.body.msg).toBe("Created Dog!");
    // })
    test("status 200, si faltan datos enviar un msg de msg: Falta enviar datos obligatorios", async () => {
        const response = await agent.post("/dogs").send(perroPrueba2)
        expect(response.statusCode).toBe(200)
        expect(response.body.msg).toBe("Falta enviar datos obligatorios")
    })
    test("status 200, si el perro ya existe enviar un msg de msg: the Dog already exists...", async () => {
        const response = await agent.post("/dogs").send(perroPrueba)
        expect(response.statusCode).toBe(200)
        expect(response.body.msg).toBe("the Dog already exists...")
    })

})

describe("DELETE /dogs/:idRaza", () => {

    // test("status 200, elimnar un perro", async () => {
    //     const response = await agent.delete(`/dogs/idRaza`)
    //     expect(response.statusCode).toBe(200
    //     expect(response.body.msg).toBe("Dog Deleted")
    // })
    test("status 200 si no se envia un id con un msg: Falta un id para eliminar al perro", async () => {
        const response = await agent.delete("/dogs/:idRaza")
        expect(response.statusCode).toBe(200)
        expect(response.body.msg).toBe("Falta un id para eliminar al perro")
    })
})

describe("GET /temperament", () => {

    test("devolver status 200 y todos los temperament", async () => {
        const response = await agent.get("/temperament")
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveLength(54)
    })
})