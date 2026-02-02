const Filters = () => {
  return (
    <div className="space-y-6">
      {/* Price */}
      <div>
        <h4 className="font-semibold mb-2">Price Range</h4>
        <input type="range" className="w-full" />
      </div>

      {/* Discount */}
      <div>
        <h4 className="font-semibold mb-2">Discount</h4>
        <label className="flex items-center gap-2">
          <input type="checkbox" /> 10% or more
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" /> 30% or more
        </label>
      </div>

      {/* Availability */}
      <div>
        <h4 className="font-semibold mb-2">Availability</h4>
        <label className="flex items-center gap-2">
          <input type="checkbox" /> In Stock
        </label>
      </div>
    </div>
  )
}
