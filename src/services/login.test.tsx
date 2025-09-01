import { login } from "./login"

describe("login", () => {
  const mockEmail = "nath@dio.bank"
  const mockPassword = "123456"

  it("Deve retornar true caso email e senha sejam válidos", async () => {
    const response = await login(mockEmail, mockPassword)
    expect(response).toBeTruthy()
  })

  it("Deve retornar false caso o email seja inválido", async () => {
    const response = await login("email@invalido.com", mockPassword)
    expect(response).toBeFalsy()
  })

  it("Deve retornar false caso a senha seja inválida", async () => {
    const response = await login(mockEmail, "senhaErrada")
    expect(response).toBeFalsy()
  })
})
