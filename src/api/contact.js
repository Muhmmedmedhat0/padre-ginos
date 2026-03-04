export async function PostContact({ name, email, message }) {
  const response = await fetch(`/api/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, message }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok, send help.");
  }

  return response.json();
}
