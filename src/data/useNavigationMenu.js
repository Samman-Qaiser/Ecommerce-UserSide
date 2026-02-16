// data/useNavigationMenu.js
import { useMemo } from 'react';
import { useActiveCategories } from '../tanstackhooks/useCategories';
import { useActiveSubCategories } from '../tanstackhooks/useSubCategories';

export const useNavigationMenu = () => {
  const { data: categories, isLoading: catLoading } = useActiveCategories();
  const { data: subCategories, isLoading: subLoading } = useActiveSubCategories();

  // Static items jo hamesha rahengy
  const staticItems = [
    { id: 'all-collections', label: 'All Collections', href: '/allcategories' },
    { id: 'contact', label: 'Contact Us', href: '/contactus' },
    { id: 'about', label: 'About Us', href: '/aboutus' },
  ];

  // Realistic placeholder menu
  const placeholderMenu = [
    {
      id: 'placeholder-1',
      label: 'Sarees',
      href: '#',
      hasDropdown: true,
      isPlaceholder: true,
      items: [
        { id: 'p1', label: 'Kora / Organza Silk', href: '#' },
        { id: 'p2', label: 'Chiffon', href: '#' },
        { id: 'p3', label: 'Matka Silk', href: '#' },
        { id: 'p4', label: 'Banarsi Silk', href: '#' },
        { id: 'p5', label: 'Katan Silk', href: '#' },
        { id: 'p6', label: 'Chanderi', href: '#' },
        { id: 'p7', label: 'Maheshwari', href: '#' },
        { id: 'p8', label: 'Muslin', href: '#' },
        { id: 'p9', label: 'Linen', href: '#' },
        { id: 'p10', label: 'Cotton', href: '#' },
      ]
    },
    {
      id: 'placeholder-2',
      label: 'Suits',
      href: '#',
      hasDropdown: false,
      isPlaceholder: true
    },
  ];

  const menuData = useMemo(() => {
    // Agar data nahi hai, placeholder menu show karo
    if (!categories || !subCategories) {
      return {
        topMenu: [...placeholderMenu, ...staticItems]
      };
    }

    // Real data ke saath dynamic menu
    const dynamicTopMenu = categories.map((cat) => {
      const relatedSubCats = subCategories.filter(
        sub => sub.categoryId === cat.id
      );

      // ✅ KEY CHANGE: Agar sirf 1 subcategory hai
      if (relatedSubCats.length === 1) {
        // Direct subcategory show karo (no dropdown)
        return {
          id: relatedSubCats[0].id,
          label: relatedSubCats[0].name,
          href: `/category/${relatedSubCats[0].slug}`,
          hasDropdown: false
        };
      }

      // ✅ Agar 0 subcategories hain (category khud show ho)
      if (relatedSubCats.length === 0) {
        return {
          id: cat.id,
          label: cat.name,
          href: `/category/${cat.slug}`,
          hasDropdown: false
        };
      }

      // ✅ Agar multiple subcategories hain (dropdown dikhaao)
      return {
        id: cat.id,
        label: cat.name,
        href: `/category/${cat.slug}`,
        hasDropdown: true,
        items: relatedSubCats.map(sub => ({
          id: sub.id,
          label: sub.name,
          href: `/category/${sub.slug}`
        }))
      };
    });

    return {
      topMenu: [...dynamicTopMenu, ...staticItems]
    };
  }, [categories, subCategories]);

  return { 
    menuData, 
    isLoading: catLoading || subLoading,
  };
};