export default async function Banner({ banner }: { banner: string }) {
  return (
    <img
      src={banner}
      alt="shop-banner"
      className="absolute w-full h-36 top-0 left-0 right-0 object-cover z-0"
    />
  )
}