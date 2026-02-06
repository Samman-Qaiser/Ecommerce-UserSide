import React from "react";
import { ArrowRight, Sparkles, TrendingUp, Star } from "lucide-react";
import AnimatedButton from "../ui/AnimmatedButton";
import { Link } from "react-router-dom";

const FeaturedCollection = () => {
    // Collections data with Bento grid sizes
    const collections = [
        {
            id: 1,
            name: "Formal Wear",
            slug: "formal-wear",
            subtitle: "Hot Trending",
            itemCount: 124,
            image:
                "formal-wear.jfif",

            size: "large", // Takes 2 columns
            icon: TrendingUp,
        },
        {
            id: 2,
            name: "Festive Wear",
            slug: "festive-wear",
            subtitle: "Cozy Vibes",
            itemCount: 89,
            image: "festive-wear.jfif",

            size: "small",
            icon: Sparkles,
        },
        {
            id: 3,
            name: "Silk Saree",
            slug: "silk-saree",
            subtitle: "Complete Look",
            itemCount: 156,
            image:
                "./silk saree.webp",

            size: "small",
            icon: Star,
        },
        {
            id: 4,
            name: "Traditional Wear",
            slug: "traditional-wear",
            subtitle: "Active Lifestyle",
            itemCount: 67,
            image: "traditional-wear.jfif",
            size: "medium",
            icon: TrendingUp,
        },
        {
            id: 5,
            name: "Office Wear",
            slug: "office-wear",
            subtitle: "Business Ready",
            itemCount: 93,
            image:
                "./Work-Sarees.jpg",

            size: "medium",
            icon: Star,
        },
        {
            id: 6,
            name: "Fancy Saree",
            slug: "fancy-saree",
            subtitle: "Must Have",
            itemCount: 201,
            image:
                "./fancy-saree.jfif",

            size: "large", // Takes 2 columns
            icon: Sparkles,
        },
    ];


    // Bento grid size classes
    const sizeClasses = {
        small: "col-span-1 row-span-1 h-74 sm:h-80",
        medium: "col-span-1 sm:col-span-1 row-span-1 h-74 sm:h-80",
        large: "col-span-1 sm:col-span-2 row-span-1 h-64 sm:h-72 lg:h-80",
    };

    return (
        <section className=" pb-5  px-4 sm:px-6 lg:px-8 bg-linear-to-br from-gray-50 via-white to-gray-100">
            <div className="max-w-7xl  mx-auto">
                {/* Section Header */}
                <div className="text-center mb-10 sm:mb-12 lg:mb-16">
                    <div className="inline-flex items-center gap-2 bg-linear-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full mb-4">
                        <Sparkles className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-semibold text-purple-900">
                            Curated Just For You
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
                        Featured Collections
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                        Explore our handpicked collections designed to elevate your style
                    </p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 ">
                    {collections.map((collection, index) => {
                        const Icon = collection.icon;
                        return (

                            <div
                                key={collection.id}
                                className={`group relative overflow-hidden rounded-md shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer ${sizeClasses[collection.size]}`}
                                style={{
                                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                                }}
                            >                      <Link to={`/category/${collection?.slug}?name=${encodeURIComponent(
                                collection?.name
                            )}`}>
                                    {/* Background Image */}
                                    <div className="absolute inset-0">
                                        <img
                                            src={collection.image}
                                            alt={collection.name}
                                            className="w-full h-full object-top object-cover transition-transform duration-700 group-hover:scale-110"
                                        />

                                        {/* linear Overlay */}
                                        <div
                                            className={`absolute inset-0 bg-linear-to-br ${collection.gradient} opacity-70 group-hover:opacity-80 transition-opacity duration-500`}
                                        ></div>

                                        {/* Noise Texture Effect */}
                                        <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
                                    </div>

                                    {/* Content Container */}
                                    <div className="relative h-full flex flex-col justify-between p-6 sm:p-8 text-white">
                                        {/* Top Section */}
                                        <div className="flex items-start justify-between">
                                            <div className="bg-white/20 backdrop-blur-md rounded-full p-3 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                                                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                                            </div>

                                            <div className="bg-white/90 text-gray-900 px-3 py-1 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                                                {collection.itemCount}+
                                            </div>
                                        </div>

                                        {/* Bottom Section */}
                                        <div className="space-y-3">
                                            <div>
                                                <p className="text-xs sm:text-sm font-medium opacity-90 mb-1">
                                                    {collection.subtitle}
                                                </p>
                                                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold drop-shadow-lg leading-tight">
                                                    {collection.name}
                                                </h3>
                                            </div>

                                            {/* CTA Button */}
                                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                                <button className="bg-white text-gray-900 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-semibold text-sm flex items-center gap-2 hover:bg-gray-100 transition-colors shadow-lg">
                                                    Explore
                                                    <ArrowRight className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Shine Effect on Hover */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                                    </div>

                                    {/* Border Glow Effect */}
                                    <div className="absolute inset-0 rounded-3xl border-2 border-white/0 group-hover:border-white/30 transition-all duration-500"></div>
                                </Link>  </div>


                        );
                    })}
                </div>

                {/* Bottom CTA */}

            </div>
            <AnimatedButton label="Discover All Collections" align="center" to='/allcategories' />
        </section>
    );
};

export default FeaturedCollection;
