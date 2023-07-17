export const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "full",
  timeStyle: "long",
});

export function utilAddHeaders(response: Response): Response {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");

  return response;
}

export function utilSuccessResponse(data: any) {
  return utilAddHeaders(
    new Response(JSON.stringify({ data }), { status: 200 })
  );
}

export function utilErrorResponse(errors: any, status: number = 500) {
  return utilAddHeaders(
    new Response(
      JSON.stringify({
        errors: [
          {
            message: errors,
            title: "Error",
          },
        ],
      }),
      { status }
    )
  );
}
