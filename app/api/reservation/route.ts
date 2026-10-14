// No booking service is configured in this source-development package.
// Fail closed before reading or retaining any submitted personal information.
export async function POST() {
  return Response.json({ error: 'Demo only: online reservations are unavailable. No booking was saved or sent.' }, {
    status: 503, headers: { 'Cache-Control': 'no-store' }
  });
}
