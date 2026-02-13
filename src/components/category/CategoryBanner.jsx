export const CategoryBanner = ({ bannerImage, categoryName, description }) => {
  if (!bannerImage) return null;

  return (
    <div className="relative w-full h-[60vh] xs:h-[40vh] sm:h-[45vh] md:h-[50vh] lg:h-[90vh] overflow-hidden">
      <img
        src={bannerImage}
        alt={categoryName}
        className="w-full h-full object-cover"
      />

      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl text-white md:text-5xl lg:text-6xl font-bold mb-3 drop-shadow-2xl">
            {categoryName}
          </h1>
          {description && (
            <p className="text-lg md:text-xl text-white/90 max-w-2xl drop-shadow-lg">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};