const userName = Math.random().toString(36).substring(2, 15);
const emailId = userName + "@domain.com";
let userId;

describe("Get List of Banners", () => {
  it("Test GET request for list of banners", () => {
    cy.request({
      method: "GET",
      url: "/api/admin/v1/banner/list-banner", // Ganti URL sesuai dengan endpoint yang sesuai di aplikasi Node.js Anda
      headers: {
        authorization: "Bearer " + Cypress.env("ACCESS_TOKEN"),
      },
    }).then((response) => {
      expect(response).to.have.property("status").to.equal(200);
      expect(response.body).to.have.property("success").to.equal(true);
      expect(response.body)
        .to.have.property("message_client")
        .to.equal("List Banner Success");

      // Ensure data structure is as expected
      expect(response.body.data).to.have.property("currentPage");
      expect(response.body.data).to.have.property("pageSize");
      expect(response.body.data).to.have.property("lastPage");
      expect(response.body.data).to.have.property("countAllData");
      expect(response.body.data).to.have.property("pages");
      expect(response.body.data).to.have.property("data").to.be.an("array");

      // Validate data for each banner
      response.body.data.data.forEach((banner) => {
        expect(banner).to.have.property("id");
        expect(banner).to.have.property("name");
        expect(banner).to.have.property("image");
        expect(banner).to.have.property("url");
        expect(banner).to.have.property("start_date");
        expect(banner).to.have.property("end_date");
        expect(banner).to.have.property("prioritas");

        // Customize additional assertions based on your data structure
        // For example, check if 'status' property is present and its value
      });
    });
  });

  it("Test handling empty list of banners", () => {
    // Simulate a case where there are no banners in the response
    cy.request({
      method: "GET",
      url: "/api/admin/v1/banner/list-banner", // Ganti URL sesuai dengan endpoint yang sesuai di aplikasi Node.js Anda
      headers: {
        authorization: "Bearer " + Cypress.env("ACCESS_TOKEN"),
      },
    }).then((response) => {
      expect(response).to.have.property("status").to.equal(200);
      expect(response.body).to.have.property("success").to.equal(true);
      expect(response.body)
        .to.have.property("message_client")
        .to.equal("List Banner Success");
      // expect(response.body.data.data).to.be.an("array").that.is.empty;
    });
  });
});

describe("Get Banner Details", () => {
  it("Test GET request for banner details", () => {
    // Assuming you have a banner with ID 1 in your database
    const bannerId = 1;

    cy.request({
      method: "GET",
      url: `/api/admin/v1/banner/${bannerId}`,
      headers: {
        authorization: "Bearer " + Cypress.env("ACCESS_TOKEN"),
      },
    }).then((response) => {
      // Assuming response body structure based on your node.js implementation
      expect(response).to.have.property("status").to.equal(200);
      expect(response.body.data).to.have.property("id").to.equal(bannerId);
      expect(response.body.data).to.have.property("name");
      expect(response.body.data).to.have.property("image");
      expect(response.body.data).to.have.property("url");
      expect(response.body.data).to.have.property("start_date");
      expect(response.body.data).to.have.property("end_date");
      expect(response.body.data).to.have.property("prioritas");
      expect(response.body.data).to.have.property("created_at");
      expect(response.body.data).to.have.property("created_by");
      expect(response.body.data).to.have.property("updated_by");
      expect(response.body.data).to.have.property("updated_at");

      // You may need to adjust the property expectations based on your actual implementation
    });
  });

  it("Test handling non-existing banner", () => {
    const nonExistingBannerId = 999; // Assuming this ID does not exist

    cy.request({
      method: "GET",
      url: `/api/admin/v1/banner/${nonExistingBannerId}`,
      headers: {
        authorization: "Bearer " + Cypress.env("ACCESS_TOKEN"),
      },
      failOnStatusCode: false, // Allow non-2xx status codes
    }).then((response) => {
      expect(response).to.have.property("status").to.equal(404);
      expect(response.body)
        .to.have.property("message_client")
        .to.equal("Banner not found");
      // You may need to adjust the property expectations based on your actual error handling
    });
  });
});
