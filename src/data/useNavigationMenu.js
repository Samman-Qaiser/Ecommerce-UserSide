import { useActiveCategories } from '../tanstackhooks/useCategories';
import { useActiveSubCategories } from '../tanstackhooks/useSubCategories';

export const useNavigationMenu = () => {
  const { data: categories, isLoading: catLoading } = useActiveCategories();
  const { data: subCategories, isLoading: subLoading } = useActiveSubCategories();

  // Static items jo hamesha rahengy
  const staticMenu = {
    allCollections: { id: 5, label: 'All Collections', href: '/allcategories' },
    contact: { id: 3, label: 'Contact Us', href: '/contactus' },
    about: { id: 4, label: 'About Us', href: '/aboutus' },
  };

  const dynamicTopMenu = categories?.map((cat) => {
    const relatedSubCats = subCategories?.filter(sub => sub.categoryId === cat.id);

    return {
      id: cat.id,
      label: cat.name,
      href: `/category/${cat.slug}`,
      hasDropdown: relatedSubCats?.length > 0,
      // Direct items array for simple dropdown
      items: relatedSubCats?.map(sub => ({
        label: sub.name,
        href: `/category/${cat.slug}`
      })) || []
    };
  }) || [];

  // Sab ko combine kar ke final object banana
  const menuData = {
    topMenu: [
      ...dynamicTopMenu,
      staticMenu.allCollections,
      staticMenu.contact,
      staticMenu.about
    ]
  };

  return { 
    menuData, 
    isLoading: catLoading || subLoading 
  };
};