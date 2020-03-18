import { coilPageActions, coilPageReducer, CoilPageState, initialState } from "./coilPage";

const serialState: CoilPageState = { ...initialState, arrangement: "serial", quantity: 4 };
const ribbonState: CoilPageState = { ...initialState, width: 10, thickness: 5 };

const actions: [keyof typeof coilPageActions, keyof CoilPageState, any][] = [
  ["setMaterial", "material", 10],
  ["setArrangement", "arrangement", "serial"],
  ["setQuantity", "quantity", 10],
  ["setLegLength", "legLength", 10],
  ["setInnerDiameter", "innerDiameter", 10],
  ["setDiameter", "diameter", 10],
  ["setWidth", "width", 10],
  ["setThickness", "thickness", 10],
  ["setParallelQuantity", "parallelQuantity", 10],
  ["setPitch", "pitch", 10]
];

describe.each(actions)("%s", (action, prop, value) => {
  it(`Sets the ${prop} property.`, () => {
    const got = coilPageReducer(initialState, (coilPageActions as any)[action](value));
    expect(got).toMatchObject({ [prop]: value });
  });
});

describe("setQuantity", () => {
  it("Sets the 'arrangement' property when 'quantity' is bigger than 1.", () => {
    const got = coilPageReducer(initialState, coilPageActions.setQuantity(2));
    expect(got).toMatchObject({ arrangement: expect.any(String) });
  });

  it("Clears the 'arrangement' property when 'quantity' is 1.", () => {
    const got = coilPageReducer(serialState, coilPageActions.setQuantity(1));
    expect(got).toMatchObject({ arrangement: undefined });
  });
});

describe("setDiameter", () => {
  it("Clears the 'width' and 'thickness' properties.", () => {
    const got = coilPageReducer(ribbonState, coilPageActions.setDiameter(10));
    expect(got).not.toMatchObject({ width: expect.anything(), thickness: expect.anything() });
  });
});

describe.each(["setWidth", "setThickness"])("%s", action => {
  it("Clears the 'diameter' property.", () => {
    const got = coilPageReducer(ribbonState, (coilPageActions as any)[action](10));
    expect(got).not.toMatchObject({ diameter: expect.anything() });
  });
});
