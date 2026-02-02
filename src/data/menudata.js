export const menuData = {
  topMenu: [
    {
      id: 1,
      label: 'Women',
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
    {
      id: 2,
      label: 'Suta Wedding',
      href: '/suta-wedding',
      hasDropdown: true,
      submenu: [
        {
          category: 'Bridal Wear',
          items: [
            { label: 'Bridal Sarees', href: '/wedding/bridal-sarees' },
            { label: 'Bridal Lehengas', href: '/wedding/bridal-lehengas' },
            { label: 'Bridal Suits', href: '/wedding/bridal-suits' },
          ]
        },
        {
          category: 'Wedding Guest',
          items: [
            { label: 'Guest Sarees', href: '/wedding/guest-sarees' },
            { label: 'Guest Suits', href: '/wedding/guest-suits' },
            { label: 'Festive Wear', href: '/wedding/festive' },
          ]
        }
      ]
    },
    {
      id: 3,
      label: 'Men',
      href: '/men',
      hasDropdown: true,
      submenu: [
        {
          category: 'Kurtas',
          items: [
            { label: 'Cotton Kurtas', href: '/men/kurtas/cotton' },
            { label: 'Silk Kurtas', href: '/men/kurtas/silk' },
            { label: 'Linen Kurtas', href: '/men/kurtas/linen' },
          ]
        },
        {
          category: 'Bottomwear',
          items: [
            { label: 'Pajamas', href: '/men/pajamas' },
            { label: 'Dhotis', href: '/men/dhotis' },
          ]
        }
      ]
    },
    {
      id: 4,
      label: 'Sale',
      href: '/sale',
      hasDropdown: false,
      highlighted: true, // Red color
    },
    {
      id: 5,
      label: 'Kids',
      href: '/kids',
      hasDropdown: true,
      submenu: [
        {
          category: 'Girls',
          items: [
            { label: 'Girls Kurtas', href: '/kids/girls/kurtas' },
            { label: 'Girls Dresses', href: '/kids/girls/dresses' },
            { label: 'Girls Sets', href: '/kids/girls/sets' },
          ]
        },
        {
          category: 'Boys',
          items: [
            { label: 'Boys Kurtas', href: '/kids/boys/kurtas' },
            { label: 'Boys Sets', href: '/kids/boys/sets' },
          ]
        }
      ]
    },
    {
      id: 6,
      label: 'Accessories',
      href: '/accessories',
      hasDropdown: true,
      submenu: [
        {
          category: 'Fashion',
          items: [
            { label: 'Dupattas', href: '/accessories/dupattas' },
            { label: 'Stoles', href: '/accessories/stoles' },
            { label: 'Blouses', href: '/accessories/blouses' },
          ]
        },
        {
          category: 'Lifestyle',
          items: [
            { label: 'Bags', href: '/accessories/bags' },
            { label: 'Jewelry', href: '/accessories/jewelry' },
          ]
        }
      ]
    },
    {
      id: 7,
      label: 'Gifts',
      href: '/gifts',
      hasDropdown: false,
    },
    {
      id: 8,
      label: 'Collections',
      href: '/collections',
      hasDropdown: true,
      submenu: [
        {
          category: 'Seasonal',
          items: [
            { label: 'Summer Collection', href: '/collections/summer' },
            { label: 'Festive Collection', href: '/collections/festive' },
            { label: 'Winter Collection', href: '/collections/winter' },
          ]
        }
      ]
    },
    {
      id: 9,
      label: 'Our Stores',
      href: '/stores',
      hasDropdown: false,
    },
    {
      id: 10,
      label: 'Events',
      href: '/events',
      hasDropdown: false,
    },
        { id: 1, label: 'Contact Us', href: '/contactus' },
    { id: 2, label: 'FAQ', href: '/faq' },
  ],

};