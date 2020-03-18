import { paletteActions, paletteReducer } from "./palette";

describe("setPalette", () => {
  it("Sets the palette", () => {
    const got = paletteReducer({ name: "Ravenbridge" }, paletteActions.setPalette("Stormy"));
    expect(got).toEqual({ name: "Stormy" });
  });
});
