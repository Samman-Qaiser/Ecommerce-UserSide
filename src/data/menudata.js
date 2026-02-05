export const menuData = {
  topMenu: [
    {
      id: 1,
      label: 'Saree',
      href: '/women',
      hasDropdown: true,
      submenu: [
        {
          category: 'Sarees',
          hasSubmenu: true,
          items: [
            { 
              label: 'All Sarees', 
              href: '/women/sarees',
              subcategories: [
                { label: 'Cotton Sarees', href: '/women/sarees/cotton' },
                { label: 'Silk Sarees', href: '/women/sarees/silk' },
                { label: 'Linen Sarees', href: '/women/sarees/linen' },
                { label: 'Chanderi Sarees', href: '/women/sarees/chanderi' },
              ]
            },
            { label: 'Handloom Sarees', href: '/women/sarees/handloom' },
            { label: 'Block Print Sarees', href: '/women/sarees/block-print' },
            { label: 'Bandhani Sarees', href: '/women/sarees/bandhani' },
          ]
        },
        {
          category: 'Suits & Sets',
          items: [
            { label: 'Salwar Suits', href: '/women/suits/salwar' },
            { label: 'Kurta Sets', href: '/women/suits/kurta-sets' },
            { label: 'Dress Materials', href: '/women/suits/dress-materials' },
            { label: 'Co-ord Sets', href: '/women/suits/coord-sets' },
          ]
        },
        {
          category: 'Kurtas & Tops',
          items: [
            { label: 'Cotton Kurtas', href: '/women/kurtas/cotton' },
            { label: 'Silk Kurtas', href: '/women/kurtas/silk' },
            { label: 'Tops & Tunics', href: '/women/tops' },
          ]
        },
        {
          category: 'Bottoms',
          items: [
            { label: 'Pants', href: '/women/bottoms/pants' },
            { label: 'Skirts', href: '/women/bottoms/skirts' },
            { label: 'Palazzos', href: '/women/bottoms/palazzos' },
          ]
        }
      ]
    },
     {id:2 , label:'Suits' ,href:'/suits'},
          {id:5 , label:'All Collections' ,href:'/allcategories'},
        { id: 3, label: 'Contact Us', href: '/contactus' },
    { id: 4, label: 'About Us', href: '/aboutus' },
  ],

};