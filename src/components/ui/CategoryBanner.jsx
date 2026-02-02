const CategoryBanner = ({ image, title }) => {
  if (!image) return null

  return (
    <div className="w-full relative">
      <img
        src={image}
        alt={title}
        className="w-full object-cover lg:h-105 h-auto"
      />

      <div className="absolute inset-0 bg-black/40 flex items-center">
        <h1 className="text-white text-2xl lg:text-4xl font-semibold px-6">
          {title}
        </h1>
      </div>
    </div>
  )
}
