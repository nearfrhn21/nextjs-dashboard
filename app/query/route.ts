import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL_NON_POOLING!, { ssl: "require" });

async function listInvoices() {
	const data = await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 44800;
  `;

	return data;
}

export async function GET() {
  try {
    const result = await sql.begin(() => [
      listInvoices()
    ]);

    return Response.json({ result });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
