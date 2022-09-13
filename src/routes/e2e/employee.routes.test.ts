import 'reflect-metadata'
import request from 'supertest'
import { app } from '../../handler'
import { Employee } from '../../modules/employee/entities/Employee'

const employee = new Employee()

describe('Employee E2E Test', () => {
  beforeAll(() => {
    Object.assign(employee, {
      nome: 'John',
      idade: 22,
      cargo: 'TI'
    })
  })

  describe('POST /employee', () => {
    it('should be able to create a employee', async () => {
      const response = await request(app)
        .post('/employee')
        .send(employee)

      expect(response.status).toBe(201)
      expect(response.body).toMatchObject(employee)

      employee.id = response.body.id
    })

    it('should be able to get a error when send a invalid "nome"', async () => {
      const response = await request(app)
        .post('/employee')
        .send({
          ...employee,
          nome: 1
        })

      expect(response.status).toBe(400)
      expect(response.body.mensagem).toBe('Validation Fails')
    })

    it('should be able to get a error when send a invalid "idade"', async () => {
      const response = await request(app)
        .post('/employee')
        .send({
          ...employee,
          idade: '1'
        })

      expect(response.status).toBe(400)
      expect(response.body.mensagem).toBe('Validation Fails')
    })

    it('should be able to get a error when send a invalid "cargo"', async () => {
      const response = await request(app)
        .post('/employee')
        .send({
          ...employee,
          cargo: 1
        })

      expect(response.status).toBe(400)
      expect(response.body.mensagem).toBe('Validation Fails')
    })
  })

  describe('GET /employee', () => {
    it('should be able to get a list of employees', async () => {
      const response = await request(app)
        .get('/employee')

      expect(response.status).toBe(200)
      expect(response.body).toEqual([
        expect.objectContaining(employee)
      ])
    })
  })

  describe('GET /employee/:id', () => {
    it('should be able to show a employee', async () => {
      const response = await request(app)
        .get(`/employee/${employee.id}`)

      expect(response.status).toBe(200)
      expect(response.body).toMatchObject(employee)
    })

    it('should be able to get a error when send a non UUID', async () => {
      const response = await request(app)
        .get('/employee/odasiobfquib')

      expect(response.status).toBe(400)
      expect(response.body.mensagem).toBe('Validation Fails')
    })
  })

  describe('UPDATE /employee/:id', () => {
    it('should be able to update a existing employee', async () => {
      const response = await request(app)
        .put(`/employee/${employee.id}`)
        .send({
          nome: 'John 2',
          idade: 21,
          cargo: 'QI'
        })

      expect(response.status).toBe(200)
      expect(response.body).toMatchObject({
        nome: 'John 2',
        idade: 21,
        cargo: 'QI'
      })
    })

    it('should be able to get a error when send a non UUID', async () => {
      const response = await request(app)
        .put('/employee/dsaobniofasbiofa')
        .send(employee)

      expect(response.status).toBe(400)
      expect(response.body.mensagem).toBe('Validation Fails')
    })

    it('should be able to get a error when send a invalid "nome"', async () => {
      const response = await request(app)
        .put(`/employee/${employee.id}`)
        .send({
          ...employee,
          nome: 1
        })

      expect(response.status).toBe(400)
      expect(response.body.mensagem).toBe('Validation Fails')
    })

    it('should be able to get a error when send a invalid "idade"', async () => {
      const response = await request(app)
        .put(`/employee/${employee.id}`)
        .send({
          ...employee,
          idade: '21'
        })

      expect(response.status).toBe(400)
      expect(response.body.mensagem).toBe('Validation Fails')
    })

    it('should be able to get a error when send a invalid "cargo"', async () => {
      const response = await request(app)
        .put(`/employee/${employee.id}`)
        .send({
          employee,
          cargo: 1
        })

      expect(response.status).toBe(400)
      expect(response.body.mensagem).toBe('Validation Fails')
    })
  })

  describe('DELETE /employee/:id', () => {
    it('should be able to delete a existing employee', async () => {
      const response = await request(app)
        .delete(`/employee/${employee.id}`)

      expect(response.status).toBe(204)
    })

    it('should be able to get a error when send a non UUID', async () => {
      const response = await request(app)
        .delete('/employee/dasodoasdoasdnoasfkasf')

      expect(response.status).toBe(400)
      expect(response.body.mensagem).toBe('Validation Fails')
    })
  })
})
