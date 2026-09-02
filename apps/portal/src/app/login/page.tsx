import { login } from './actions'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message: string }>
}) {
  const resolvedSearchParams = await searchParams
  const message = resolvedSearchParams.message

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 mx-auto pt-20">
      <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
        <h1 className="text-2xl font-bold mb-4">Đăng nhập Hệ thống</h1>
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          placeholder="ban@example.com"
          required
        />
        <button
          formAction={login}
          className="bg-blue-600 rounded-md px-4 py-2 text-white font-semibold mb-2 hover:bg-blue-700 transition"
        >
          Gửi liên kết đăng nhập
        </button>
        {message && (
          <p className="mt-4 p-4 bg-blue-100 text-blue-900 text-center rounded-md">
            {message}
          </p>
        )}
      </form>
    </div>
  )
}
