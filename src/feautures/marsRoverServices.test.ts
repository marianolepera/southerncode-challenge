import marsRoverService from "./marsRoverServices";

describe("Testing API services", () => {

    it("Testing get rovers photos service", async () => {
        const queryObject={
            initialString:"curiosity/latest_photos?",
            pageNumber:1
        }
        const data = await marsRoverService.getMarsRover(queryObject)
    
        expect(typeof data).toBe("object");
      });
})