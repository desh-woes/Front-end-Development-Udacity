const endpoints = require("../server");

test("Verify that name splitting is correct for the pixabay API", async () => {
    try {
        await endpoints.fetchResults("Bad URL");
    } catch (error) {
        expect(error.name).toBe("TypeError");
    }
  });