import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import "@/i18n";
import ContactForm from "./ContactForm";

describe("ContactForm modal submission", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("posts a complete contact payload to Netlify", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(null, { status: 200 }));

    render(
      <MemoryRouter>
        <ContactForm variant="modal" formName="contact" formLocation="test_modal" />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByPlaceholderText("Your full name"), { target: { value: "Test Person" } });
    fireEvent.change(screen.getByPlaceholderText("your@email.com"), { target: { value: "person@example.com" } });
    fireEvent.click(screen.getByRole("button", { name: /how can we help you/i }));
    fireEvent.click(screen.getByRole("option", { name: "Web Design" }));
    fireEvent.change(screen.getByPlaceholderText("Tell us about your project..."), {
      target: { value: "I would like to discuss a new website project." },
    });
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: /let's talk/i }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    const [url, request] = fetchMock.mock.calls[0];
    const body = new URLSearchParams(String(request?.body));

    expect(url).toBe("/");
    expect(request?.method).toBe("POST");
    expect(body.get("form-name")).toBe("contact");
    expect(body.get("fullName")).toBe("Test Person");
    expect(body.get("email")).toBe("person@example.com");
    expect(body.get("service")).toBe("Web Design");
    expect(body.get("message")).toBe("I would like to discuss a new website project.");
    expect(await screen.findByText("Thank you!")).toBeInTheDocument();
  });
});
