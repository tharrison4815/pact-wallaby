import axios from "axios";
import { Pact } from "@pact-foundation/pact";

const pact = new Pact({
  consumer: "mockConsumer",
  provider: "mockProvider",
  port: 1234,
});

beforeAll(async () => {
  await pact.setup();

  await pact.addInteraction({
    state: "mockstate",
    uponReceiving: "something",
    withRequest: {
      method: "GET",
      path: "/mockpath",
    },
    willRespondWith: {
      status: 200,
      body: "mockBody",
    },
  });
}, 30000);

it("should return mockBody", async () => {
  const result = await axios.get("http://localhost:1234/mockpath");
  expect(result.data).toBe("mockBody");
});

afterEach(() => pact.verify());

afterAll(() => pact.finalize());
