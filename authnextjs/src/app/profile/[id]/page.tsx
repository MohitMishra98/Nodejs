export default async function UserProfile({ params }: any) {
  const { id } = await params;
  return <h1>Profile Page {id}</h1>;
}
