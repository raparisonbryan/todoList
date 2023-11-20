const bcrypt = require("bcrypt");
const User = require("../models/User");
const { signup } = require("../controllers/users");

// Mock des dépendances
jest.mock("bcrypt");
jest.mock("../models/User");

describe("Signup Controller Function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should register a user successfully", async () => {
    //simuler un fonctionnement normal
    bcrypt.hash.mockResolvedValue("hashed_password");
    User.prototype.save.mockResolvedValue({});

    const req = {
      body: {
        name: "testUser",
        imageUrl: "testImageUrl",
        phone: "testPhone",
        email: "test@email.com",
        password: "testPassword",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await signup(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: "Utilisateur créé !" });
  });

  it("should handle bcrypt hashing error", async () => {
    // Simuler une erreur de bcrypt
    bcrypt.hash.mockRejectedValue(new Error("Bcrypt error"));

    const req = {
      body: {
        name: "testUser",
        imageUrl: "testImageUrl",
        phone: "testPhone",
        email: "test@email.com",
        password: "testPassword",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await signup(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: expect.any(Error) });
  });

  it("should handle user save error", async () => {
    // Simuler un comportement normal de bcrypt
    bcrypt.hash.mockResolvedValue("hashed_password");
    // Simuler une erreur lors de la sauvegarde de l'utilisateur
    User.prototype.save.mockRejectedValue(new Error("Save error"));

    const req = {
      body: {
        name: "testUser",
        imageUrl: "testImageUrl",
        phone: "testPhone",
        email: "test@email.com",
        password: "testPassword",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await signup(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: expect.any(Error) });
  });
});
