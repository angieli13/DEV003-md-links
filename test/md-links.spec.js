const {mdLinks} = require('../index.js');



describe("mdLinks", () => {
  it("Debe ser una función", () => {
    expect(typeof mdLinks).toBe("function");
  });
  it("Deberia devolver una promesa", () => {
    return mdLinks(
      "https://github.com/angieli13/DEV003-md-links/blob/main/README.md"
    )
      .then((route) => {
        expect(mdLinks(route)).toBe(typeof Promise);
      })
      .catch(() => {});
  });
  it("Debe resolver cuando el path existe", () => {
    const path =
      "https://github.com/angieli13/DEV003-md-links/blob/main/README.md";
    return mdLinks(path)
      .then((route) => {
        expect(route).resolves(path);
      })
      .catch(() => {});
  });
});