const suppliers = [
    {
        brand: "RAYBESTOS",
        logoUrl: "https://res.cloudinary.com/dpeocx0yy/image/upload/v1725341037/raybestos-logo-1_nxhtib.jpg",
        description:"A Legacy of Trust and InnovationFor over a century, Raybestos®has been a trusted name in automotive brake parts, known for innovation and reliability. Our journey began in 1902, and we've continued to evolve, earning a reputation you can count on.Our Dedication to Quality and InnovationOur team of engineers in McHenry, Illinois, works diligently to design a range of brake parts, including friction, rotors, drums, calipers, hub assemblies and hydraulics. These products are crafted to match or exceed OE fit, form, and function, ensuring your safety on the road.Rigorous Testing for Peace of MindSafety and reliability are our top priorities. Each Raybestos®product undergoes extensive testing to meet our high standards. From design to manufacturing to packaging, we're all about the details that set us apart.Local and Global ReachAs a global leader in brake parts, Raybestos®has manufacturing plants in North America and various locations worldwide, and is part ofFirst Brands Group. Our facilities proudly hold ISO/TS 16949 and ISO 9001 certifications, reinforcing our commitment to excellence.",
        headings: "Replacement Parts",
        categories: [
            {
                name: "Brake Parts",
                subCategories: [
                    "Brake Rotors", "Brake Pads", "Brake Calipers", "Brake Shoes", "Brake Drums",
                    "Brake Hydraulics", "Brake Hardware", "Master Cylinders & Brake Boosters", "ABS Parts"
                ]
            },
            {
                name: "Wheel Bearings & Hub Assembly",
                subCategories: [
                    "Wheel Bearings", "Hub Assembly", "Wheel Bearing Seals & Retainers", "Hub Repair Kits"
                ]
            },
            {
                name: "Clutch & Flywheel",
                subCategories: ["Clutch Hydraulics"]
            }
        ]
    },
    {
        brand: "MOTOSEL",
        logoUrl: "https://res.cloudinary.com/dpeocx0yy/image/upload/v1725341088/LOGO-Motosel-Industrial-Group-Inc_mofpvo.jpg",
        headings: "Fluids and Lubricants",
        categories: [
            {
                name: "Oil and Lubricant",
                subCategories: [
                    "Engine Oil", "Transmission Fluid", "Lubricant & Grease"
                ]
            },
            {
                name: "Fluids",
                subCategories: [
                    "Antifreeze & Windshield Wash Fluid", "Brake & Power Steering Fluid"
                ]
            }
        ]
    },
    {
        brand: "MOTOSEL",
        headings: "Replacement Parts",
        categories: [
            {
                name: "Filters",
                subCategories: [
                    "Engine Oil Filter", "Fuel Filter", "Cabin Air Filter", "Air Filter"
                ]
            }
        ]
    },
    {
        brand: "MOTOSEL",
        headings: "Industrial & Safety",
        categories: [
            {
                name: "Farm Supplies",
                subCategories: ["Fluids & Lubrication"]
            }
        ]
    },
    {
        brand: "MOTOSEL",
        headings: "Tools & Equipment",
        categories: [
            {
                name: "Shop Consumables & Tools",
                subCategories: [
                    "Lubrication Products", "Cleaners, Degreasers & Wipes"
                ]
            }
        ]
    },
    {
        brand: "BOSCH",
        logoUrl: "https://res.cloudinary.com/dpeocx0yy/image/upload/v1725341636/Bosch-Logo_xyera9.png",
        headings: "Replacement Parts",
        categories: [
            {
                name: "Ignition System",
                subCategories: [
                    "Ignition Coil", "Spark Plug", "Ignition Wires", "Coil Over Plugs"
                ]
            },
            {
                name: "Brake Parts",
                subCategories: [
                    "Brake Rotors", "Brake Pads", "Brake Shoes", "Brake Hardware", "ABS System Parts"
                ]
            },
            {
                name: "Auto Electrical",
                subCategories: [
                    "Starter", "Alternator", "Batteries", "Engine Sensors"
                ]
            },
            {
                name: "Emission Controls",
                subCategories: [
                    "Emission Parts", "DEF Parts", "EGR Valves & Parts"
                ]
            },
            {
                name: "Fuel Delivery",
                subCategories: [
                    "Fuel Pump, Fuel Tank & Turbo System", "Fuel Injection"
                ]
            },
            {
                name: "Wiper & Parts",
                subCategories: ["Wiper Blades", "Wiper Arms"]
            },
            {
                name: "Filters",
                subCategories: [
                    "Engine Oil Filter", "Cabin Air Filter", "Engine Air Filter", "Fuel Filters"
                ]
            },
            {
                name: "Steering System",
                subCategories: ["Steering Gear", "Power Steering Pumps & Hoses"]
            },
            {
                name: "Cooling System",
                subCategories: ["Radiator", "Water Pumps", "Cooling System Parts"]
            },
            {
                name: "Engine Components",
                subCategories: ["Pistons, Oil Pumps & Block Parts"]
            }
        ]
    },
    {
        brand: "U START BATTERY",
        logoUrl: "https://res.cloudinary.com/dpeocx0yy/image/upload/v1725341694/ustart-logo-500x300_hmtmca.jpg",
        headings: "Replacement Parts",
        categories: [
            {
                name: "Auto Electrical",
                subCategories: ["Batteries"]
            }
        ]
    },
    {
        brand: "CENTRIC PARTS",
        logoUrl: "https://res.cloudinary.com/dpeocx0yy/image/upload/v1725341766/Centric-Parts-Logo_qxodsc.png",
        headings: "Replacement Parts",
        categories: [
            {
                name: "Brake Parts",
                subCategories: [
                    "Brake Rotors", "Brake Pads", "Brake Calipers", "Brake Hydraulics", "Brake Drums"
                ]
            }
        ]
    },
    {
        brand: "RS PARTS",
        logoUrl: "https://res.cloudinary.com/dpeocx0yy/image/upload/v1725341872/_COUL_RS_Parts_logo_b7gsrj.jpg",
        headings: "Replacement Parts",
        categories: [
            {
                name: "Brake Parts",
                subCategories: [
                    "Brake Rotors", "Brake Pads", "Brake Drums", "Brake Shoes"
                ]
            }
        ]
    },
    {
        brand: "DORMAN",
        logoUrl: "https://res.cloudinary.com/dpeocx0yy/image/upload/v1725341899/brand-dorman_q9tfui.jpg",
        description:"People's lives and livelihoods depend upon cars and trucks. Dorman gives people greater freedom to fix these vehicles by constantly developing new repair solutions that put owners and installers first.Since 1918, we have been the automotive aftermarket’s pioneering problem solvers. We have released thousands of parts and components that people could once only buy from original equipment manufacturers. By always innovating, we have led the way in growing the aftermarket, providing more opportunity to individuals and businesses who depend on automotive maintenance. That’s why our catalog includes more than 118,000 products and grows every year.What makes us distinct from other aftermarket companies is our customer-first mindset. Everything we do is centered around providing customer value, both in the quality of our products, and the creativity of our solutions. Our engineers and designers go out of their way to save repair technicians time, and save vehicle owners money. The engine that powers us is our Culture of Contribution. We empower and celebrate new ideas throughout our organization, because that just means we have more ways to solve problems. Our family-run roots give us a spirit of entrepreneurship that accelerates our speed and agility. This is a rare combination in a fast-growing, global enterprise that makes Dorman a special place to work.",
        headings: "Replacement Parts",
        categories: [
            {
                name: "Steering System",
                subCategories: [
                    "Steering Parts", "Power Steering Pumps & Hoses",
                    "Steering Rack Assembly", "Power Steering Kits and Seals"
                ]
            },
            {
                name: "Suspension Parts",
                subCategories: [
                    "Air Suspension", "Springs", "Shocks & Struts", "Shocks & Strut Hardware"
                ]
            },
            {
                name: "Wheel Bearings & Hub Assembly",
                subCategories: [
                    "Wheel Bearings", "Hub Assembly", "Wheel Bearing Seals & Retainers", "Hub Repair Kits"
                ]
            },
            {
                name: "Automotive Lighting",
                subCategories: [
                    "Headlight Assembly & Bulbs", "Tail Light Assembly & Bulbs",
                    "Side Marker Lights", "Turn Signal Lights", "Lighting Accessories", "Fog Lights"
                ]
            },
            {
                name: "Wiper & Parts",
                subCategories: ["Wiper Motor"]
            },
            {
                name: "Drivetrain & Parts",
                subCategories: [
                    "Axle Shafts & CV Joints", "U Joints & Drive Shafts",
                    "Drive Axle Parts", "Transfer Case & Parts", "CV Boots", "Differential & Parts"
                ]
            },
            {
                name: "Engine Components",
                subCategories: [
                    "Engine Gaskets & Seals", "Valve Train & Cylinder Head Parts",
                    "Timing Parts & Camshafts", "Engine Bearings", "Piston Rings",
                    "Pistons, Oil Pumps & Block Parts", "Gasket Set",
                    "Engine Miscellaneous (Switch,Caps & Mounts)",
                    "Engines & Kits", "Engines Oil Pan, Gasket & Drain Plugs"
                ]
            },
            {
                name: "Brake Parts",
                subCategories: [
                    "Brake Calipers", "Brake Hydraulics",
                    "Brake Hardware", "Master Cylinders & Brake Boosters", "ABS Parts"
                ]
            },
            {
                name: "Transmission System",
                subCategories: [
                    "Manual Transmission Parts", "Automatic Transmission Parts", "Transmission Assembly"
                ]
            },
            {
                name: "Clutch & Flywheel",
                subCategories: ["Clutch", "Flywheel", "Clutch Hydraulics"]
            },
            {
                name: "Cooling System",
                subCategories: [
                    "Radiator", "Coolant Reservoir Tanks & Parts",
                    "Radiator Hoses", "Water Pumps", "Thermostat & Parts", "Cooling System Parts"
                ]
            },
            {
                name: "Fuel Delivery",
                subCategories: [
                    "Fuel Pump, Fuel Tank & Turbo System", "Carburetors",
                    "Carburetor Kits & Parts", "Carburetor Choke & Parts",
                    "Fuel Injection", "Engine Filters & PCV"
                ]
            },
            {
                name: "Emission Controls",
                subCategories: [
                    "Emission Parts", "EGR Valves & Parts", "DEF Parts"
                ]
            },
            {
                name: "Exhaust Components",
                subCategories: ["Catalytic Converter", "Exhaust Pipes", "Exhaust Gaskets"]
            },
            {
                name: "Heating & Air Conditioning",
                subCategories: [
                    "Condenser", "Air Conditioning Compressor, Clutch & Idler Assembly",
                    "Air Conditioning Filter, Valve Condenser, Evaporator & Hose",
                    "Heater Valves, Heater Cores & Blowers",
                    "Air Conditioning & Heater Switch & Relays",
                    "Air Conditioning Compressor Parts"
                ]
            },
            {
                name: "Ignition System",
                subCategories: ["Spark Plugs", "Ignition Coils", "Ignition Wires", "Coil Over Plugs"]
            },
            {
                name: "Auto Electricals",
                subCategories: ["Starter", "Alternator", "Engine Sensors", "Computers & Modules"]
            },
            {
                name: "Body Parts & Accessories",
                subCategories: [
                    "Bumpers & Components", "Engine Covers", "Bug Deflectors",
                    "Doors & Hardware", "Mirrors", "Grilles", "Fenders",
                    "Window Visors", "Running Boards", "Mud Flaps", "Seat Covers", "Floors Mats"
                ]
            }
        ]
    },
    {
        brand: "DORMAN",
        headings: "Tools & Equipment",
        categories: [
            {
                name: "Automotive Service Tools",
                subCategories: ["Hand Tools"]
            },
            {
                name: "Shop Consumables & Tools",
                subCategories: ["Diagnostic Equipment and Tools"]
            }
        ]
    },
    {
        brand: "MEVOTECH",
        logoUrl: "https://res.cloudinary.com/dpeocx0yy/image/upload/v1725341973/MEV_Logo_lmjrcy.jpg",
        headings: "Replacement Parts",
        categories: [
            {
                name: "Drivetrain & Parts",
                subCategories: [
                    "Axle Shafts & CV Joints", "U Joints & Drive Shafts",
                    "Drive Axle Parts", "Transfer Case & Parts", "CV Boots", "Differential & Parts"
                ]
            },
            {
                name: "Steering System",
                subCategories: [
                    "Steering Parts", "Steering Rack Assembly"
                ]
            },
            {
                name: "Suspension Parts",
                subCategories: [
                    "Suspension Parts", "Air Suspension", "Springs",
                    "Shocks & Struts", "Shocks & Strut Hardware"
                ]
            },
            {
                name: "Wheel Bearings & Hub Assembly",
                subCategories: [
                    "Wheel Bearings", "Hub Assembly", "Wheel Bearing Seals & Retainers", "Hub Repair Kits"
                ]
            }
        ]
    },
    {
        brand: "WILSON",
        logoUrl: "https://res.cloudinary.com/dpeocx0yy/image/upload/v1725342270/Wilson-Logo_wt9hqz.jpg",
        headings: "Replacement Parts",
        categories: [
            {
                name: "Auto Electrical",
                subCategories: ["Starter", "Alternator"]
            }
        ]
    },
    {
        brand: "NGK",
        logoUrl: "https://res.cloudinary.com/dpeocx0yy/image/upload/v1725342125/ngk-logo-1_hq3gi5.png",
        headings: "Replacement Parts",
        categories: [
            {
                name: "Ignition System",
                subCategories: ["Spark Plugs", "Ignition Coils", "Ignition Wires"]
            }
        ]
    },
    {
        brand: "MOOG",
        logoUrl: "https://res.cloudinary.com/dpeocx0yy/image/upload/v1725342317/82356612-moo-7536-rk622933_958__1_hdvhia.webp",
        headings: "Replacement Parts",
        categories: [
            {
                name: "Steering System",
                subCategories: [
                    "Steering Parts", "Power Steering Kits and Seals"
                ]
            },
            {
                name: "Suspension Parts",
                subCategories: [
                    "Suspension Parts", "Springs", "Shocks & Struts", "Shocks & Strut Hardware"
                ]
            },
            {
                name: "Drivetrain & Parts",
                subCategories: [
                    "Axle Shafts & CV Joints", "U Joints & Drive Shafts",
                    "Drive Axle Parts", "Transfer Case & Parts", "CV Boots", "Differential & Parts"
                ]
            },
            {
                name: "Wheel Bearings & Hub Assembly",
                subCategories: [
                    "Wheel Bearings", "Hub Assembly", "Wheel Bearing Seals & Retainers", "Hub Repair Kits"
                ]
            }
        ]
    },
    {
        brand: "WIX FILTERS",
        logoUrl: [
            "https://wixeurope.com/media/263/download/WIX_logo_White_Background.jpg?v=1",
            "https://syntheticlubricants.ca/wp-content/uploads/2021/09/WIX-Logo.jpg"
        ],
        headings: "Replacement Parts",
        categories: [
            {
                name: "Filters",
                subCategories: [
                    "Engine Oil Filters", "Cabin Air Filters", "Engine Air Filters",
                    "Transmission Filters", "Coolant Filters", "Fuel Filters"
                ]
            },
            {
                name: "Fuel Delivery",
                subCategories: ["Engine Filters & PCV"]
            }
        ]
    },
    {
        brand: "DENSO",
        logoUrl: "https://res.cloudinary.com/dpeocx0yy/image/upload/v1725342360/denso9853_ux0yed.jpg",
        headings: "Replacement Parts",
        categories: [
            {
                name: "Filters",
                subCategories: [
                    "Engine Oil Filters", "Cabin Air Filters", "Engine Air Filters",
                    "Transmission Filters", "Coolant Filters", "Fuel Filters"
                ]
            },
            {
                name: "Emission Controls",
                subCategories: [
                    "EGR Valves & Parts", "Emission Parts"
                ]
            },
            {
                name: "Fuel Delivery",
                subCategories: [
                    "Engine Filters & PCV", "Fuel Injection",
                    "Fuel Pump, Fuel Tank & Turbo System"
                ]
            },
            {
                name: "Ignition System",
                subCategories: [
                    "Coil Over Plugs", "Ignition Coils", "Ignition Wires", "Spark Plugs"
                ]
            },
            {
                name: "Auto Electricals",
                subCategories: [
                    "Alternator", "Starter", "Engine Sensors"
                ]
            },
            {
                name: "Cooling System",
                subCategories: [
                    "Radiator", "Water Pumps", "Cooling System Parts",
                    "Coolant Reservoir Tanks & Parts"
                ]
            },
            {
                name: "Brake Parts",
                subCategories: ["ABS Parts"]
            },
            {
                name: "Heating & Air Conditioning",
                subCategories: [
                    "Air Conditioning Compressor, Clutch & Idler Assembly", "Condenser",
                    "Heater Valves, Heater Cores & Blowers", "Air Conditioning Compressor Parts",
                    "Air Conditioning & Heater Switch & Relays"
                ]
            },
            {
                name: "Engine Components",
                subCategories: [
                    "Engines Oil Pan, Gasket & Drain Plugs"
                ]
            },
            {
                name: "Wiper & Parts",
                subCategories: [
                    "Wiper Motors", "Washer Pumps", "Washer Nozzle"
                ]
            }
        ]
    },
    {
        brand: "BLUE STREAK (TECHSMART)",
        headings:"Replacement Parts",
        logoUrl: "https://res.cloudinary.com/dpeocx0yy/image/upload/v1725342394/16201_bluestreaklogose_t1m8fq.jpg",
        categories: [
            {
                name: "Ignition System",
                subCategories: [
                    "Coil Over Plugs", "Ignition Coils", "Ignition Wires", "Spark Plugs"
                ]
            },
            {
                name: "Auto Electricals",
                subCategories: ["Engine Sensors"]
            }
        ]
    },
    {
        brand: "SKF",
        logoUrl: "https://res.cloudinary.com/dpeocx0yy/image/upload/v1725342454/skf-group-vector-logo_aelgsy.png",
        headings: "Replacement Parts",
        categories: [
            {
                name: "Steering System",
                subCategories: [
                    "Power Steering Kits and Seals", "Steering Parts"
                ]
            },
            {
                name: "Suspension Parts",
                subCategories: ["Suspension Parts"]
            },
            {
                name: "Drivetrain & Parts",
                subCategories: [
                    "CV Boots", "Transfer Case & Parts", "Drive Axle Parts", "Differential & Parts"
                ]
            },
            {
                name: "Transmission System",
                subCategories: [
                    "Automatic Transmission Parts", "Manual Transmission Parts"
                ]
            },
            {
                name: "Engine Components",
                subCategories: [
                    "Engine Gaskets & Seals", "Engine Miscellaneous (Switch,Caps & Mounts)",
                    "Engines Oil Pan, Gasket & Drain Plugs", "Valve Train & Cylinder Head Parts",
                    "Timing Parts & Camshafts", "Engines & Kits"
                ]
            },
            {
                name: "Automotive Belts",
                subCategories: [
                    "Belt Tensioners", "Idler Pulleys", "Tensioner Assembly"
                ]
            },
            {
                name: "Clutch & Flywheel",
                subCategories: ["Clutch Hydraulics"]
            },
            {
                name: "Wheel Bearings & Hub Assembly",
                subCategories: [
                    "Hub Assembly", "Hub Repair Kits",
                    "Wheel Bearing Seals & Retainers", "Wheel Bearings"
                ]
            },
            {
                name: "Brake Parts",
                subCategories: ["Brake Hydraulics", "Brake Hardware"]
            },
            {
                name: "Heating & Air Conditioning",
                subCategories: [
                    "Air Conditioning Compressor Parts",
                    "Air Conditioning Filter, Valve Condenser, Evaporator & Hose"
                ]
            },
            {
                name: "Filters",
                subCategories: [
                    "Engine Oil Filters", "Cabin Air Filters", "Engine Air Filters",
                    "Transmission Filters", "Coolant Filters", "Fuel Filters"
                ]
            }
        ]
    },
    {
        brand: "DAYCO",
        logoUrl: "https://res.cloudinary.com/dpeocx0yy/image/upload/v1725342533/Dayco-Products-LLC-logo_wbrnbm.jpg",
        headings: "Replacement Parts",
        categories: [
            {
                name: "Engine Components",
                subCategories: [
                    "Timing Parts & Camshafts", "Engine Gaskets & Seals", "Engine Miscellaneous (Switch,Caps & Mounts)"
                ]
            },
            {
                name: "Automotive Belts",
                subCategories: [
                    "Belt Tensioners", "Idler Pulleys", "Tensioner Assembly", "Serpentine Belts"
                ]
            },
            {
                name: "Cooling System",
                subCategories: [
                    "Radiator Hoses", "Water Pumps", "Cooling System Parts"
                ]
            },
            {
                name: "Auto Electricals",
                subCategories: ["Engine Sensors"]
            }
        ]
    },
    {
        brand: "WALKER EXHAUST",
        logoUrl: "https://res.cloudinary.com/dpeocx0yy/image/upload/v1725342574/s-l1600-7_s9pm3p.jpg",
        headings: "Replacement Parts",
        categories: [
            {
                name: "Exhaust Components",
                subCategories: [
                    "Catalytic Converter", "Mufflers", "Exhaust Gaskets", "Resonator", "Exhaust Pipes"
                ]
            }
        ]
    },
    {
        brand: "LIQUI MOLY",
        logoUrl: "https://res.cloudinary.com/dpeocx0yy/image/upload/v1725342639/2560px-Liqui-moly.svg_viwauw.png",
        headings: "Fluids & Lubricants",
        categories: [
            {
                name: "Car Wash & Wax",
                subCategories: [
                    "Interior & Exterior Care Products", "Polish", "Wash Cleaners"
                ]
            },
            {
                name: "Fluids",
                subCategories: [
                    "Adhesives & Sealants", "Antifreeze & Windshield Wash Fluid",
                    "Brake & Power Steering Fluid", "Engine Additive & Cleaner"
                ]
            },
            {
                name: "Oil & Lubricants",
                subCategories: [
                    "Differential Oil", "Engine Oil", "Gear Oil", "Lubricant & Grease"
                ]
            },
            {
                name: "Cooling Chemicals",
                subCategories: ["AC Compressor Oil", "Refrigerant"]
            }
        ]
    },
    {
        brand: "BBB INDUSTRIES",
        logoUrl: "https://res.cloudinary.com/dpeocx0yy/image/upload/v1725342740/BBB_Industries_Logo_ppfv6c.jpg",
        headings: "Replacement Parts",
        categories: [
            {
                name: "Steering System",
                subCategories: ["Steering Gear", "Steering Rack Assembly"]
            }
        ]
    },
    {
        brand: "CHEVRON LUBRICANTS",
        logoUrl: "https://res.cloudinary.com/dpeocx0yy/image/upload/v1725342763/chevr26_ppbpi1.jpg",
        headings: "Fluids & Lubricants",
        categories: [
            {
                name: "Engine Oil",
                subCategories: [
                    "Lubricant & Grease", "Transmission Fluid", "Gear Oil"
                ]
            },
            {
                name: "Industrial Supplies",
                subCategories: [
                    "Filters & Fluids"
                ]
            }
        ]
    },
    {
        brand: "COOLING DEPOT",
        logoUrl: "https://res.cloudinary.com/dpeocx0yy/image/upload/v1725342780/cooling-logo-500x300-1_tb8lbg.jpg",
        headings: "Replacement Parts",
        categories: [
            {
                name: "Automotive Lighting",
                subCategories: [
                    "Headlight Assembly & Bulbs", "Tail Light Assembly & Bulbs",
                    "Side Marker Lights", "Turn Signal Lights", "Lighting Accessories", "Fog Lights"
                ]
            },
            {
                name: "Engine Components",
                subCategories: [
                    "Engine Gaskets & Seals", "Gasket Set", "Engine Miscellaneous (Switch, Caps & Mounts)"
                ]
            },
            {
                name: "Transmission System",
                subCategories: [
                    "Manual Transmission Parts", "Automatic Transmission Parts", "Transmission Assembly"
                ]
            },
            {
                name: "Fuel Delivery",
                subCategories: [
                    "Fuel Pump, Fuel Tank & Turbo System"
                ]
            },
            {
                name: "Heating & Air Conditioning",
                subCategories: [
                    "Condenser", "Air Conditioning Compressor, Clutch & Idler Assembly",
                    "Air Conditioning Filter, Valve Condenser, Evaporator & Hose", "Heater Valves, Heater Cores & Blowers",
                    "Air Conditioning & Heater Switch & Relays", "Air Conditioning Compressor Parts"
                ]
            },
            {
                name: "Automotive Belts",
                subCategories: [
                    "Belt Tensioners", "Tensioner Assembly", "Idler Pulleys"
                ]
            },
            {
                name: "Cooling System",
                subCategories: [
                    "Radiator", "Coolant Reservoir Tanks & Parts", "Radiator Hoses",
                    "Water Pumps", "Thermostat & Parts", "Cooling System Parts"
                ]
            }
        ]
    },
    {
        brand: "AKEBONO",
        logoUrl: "https://res.cloudinary.com/dpeocx0yy/image/upload/v1725342801/akebono_seglbe.jpg",
        headings: "Replacement Parts",
        categories: [
            {
                name: "Brake Parts",
                subCategories: [
                    "Brake Pads", "Brake Rotors"
                ]
            }
        ]
    },
    {
        brand: "HELLA PAGID",
        logoUrl: "https://res.cloudinary.com/dpeocx0yy/image/upload/v1725342822/hellapg_i1iveh.png",
        headings: "Replacement Parts",
        categories: [
            {
                name: "Brake Parts",
                subCategories: [
                    "Brake Pads", "Brake Rotors"
                ]
            }
        ]
    },
    {
        brand: "GATES",
        logoUrl: "https://www.rffager.com/wp-content/uploads/2018/05/gates-logo.jpg",
        headings: "Replacement Parts",
        categories: [
            {
                name: "Steering System",
                subCategories: [
                    "Power Steering Pumps & Hoses", "Power Steering Kits and Seals", "Steering Parts"
                ]
            },
            {
                name: "Emission Controls",
                subCategories: [
                    "Emission Parts", "EGR Valves & Parts", "DEF Parts"
                ]
            },
            {
                name: "Engine Components",
                subCategories: [
                    "Valve Train & Cylinder Head Parts", "Timing Parts & Camshafts",
                    "Pistons, Oil Pumps & Block Parts", "Engine Miscellaneous (Switch, Caps & Mounts)",
                    "Engines Oil Pan, Gasket & Drain Plugs"
                ]
            },
            {
                name: "Fuel Delivery",
                subCategories: [
                    "Fuel Pump, Fuel Tank & Turbo System"
                ]
            },
            {
                name: "Automotive Belts",
                subCategories: [
                    "Serpentine Belts", "Belt Tensioners", "Tensioner Assembly", "Idler Pulleys"
                ]
            },
            {
                name: "Cooling System",
                subCategories: [
                    "Water Pumps", "Cooling System Parts", "Radiator", "Radiator Hoses"
                ]
            },
            {
                name: "Wipers & Parts",
                subCategories: [
                    "Washer Nozzles"
                ]
            },
            {
                name: "Heating & Air Conditioning",
                subCategories: [
                    "Air Conditioning Filter, Valve Condenser, Evaporator & Hose",
                    "Heater Valves, Heater Cores & Blowers"
                ]
            },
            {
                name: "Auto Electricals",
                subCategories: [
                    "Alternator"
                ]
            }
        ]
    },
    {
        brand: "3M",
        logoUrl: "https://res.cloudinary.com/dpeocx0yy/image/upload/v1725343029/3M-logo-1-scaled_bf13g4.jpg",
        headings: "Tools & Equipment",
        categories: [
            {
                name: "Shop Consumables & Tools",
                subCategories: [
                    "Shop Equipment", "Lubrication Products"
                ]
            },
            {
                name: "Paint & Body Shop Equipment",
                subCategories: [
                    "Welding Equipment & Supplies", "Abrasive Equipment & Supplies",
                    "Painting Equipment & Supplies", "Paint Booths & Aspiration Equipment"
                ]
            },
            {
                name: "Body Parts & Accessories",
                subCategories: []
            },
            {
                name: "Car Wash & Wax",
                subCategories: [
                    "Wash Cleaners", "Interior & Exterior Care Products", "Polish"
                ]
            }
        ]
    },
    {
        brand: "GROTE",
        logoUrl: "https://res.cloudinary.com/dpeocx0yy/image/upload/v1725343049/GroteLogo-Red-PMS_185-RGB_ixqo1w.jpg",
        headings: "Replacement Parts",
        categories: [
            {
                name: "Automotive Lighting",
                subCategories: [
                    "Lighting Accessories", "Headlight Assembly & Bulbs",
                    "Side Marker Lights", "Tail Light Assembly & Bulbs", "Turn Signal Lights"
                ]
            }
        ]
    },
    {
        brand: "MANN FILTERS",
        logoUrl: "https://res.cloudinary.com/dpeocx0yy/image/upload/v1725343069/mannfilter_rjdihn.png",
        headings: "Replacement Parts",
        categories: [
            {
                name: "Filters",
                subCategories: [
                    "Cabin Air Filters", "Engine Air Filters", "Engine Oil Filters",
                    "Fuel Filters", "Coolant Filters", "Transmission Filters"
                ]
            }
        ]
    },
    {
        brand: "MOTORAD",
        logoUrl: "https://res.cloudinary.com/dpeocx0yy/image/upload/v1725343117/brand-motorad_fo5cem.jpg",
        headings: "Replacement Parts",
        categories: [
            {
                name: "Engine Components",
                subCategories: [
                    "Engine Miscellaneous (Switch, Caps & Mounts)"
                ]
            },
            {
                name: "Fuel Delivery",
                subCategories: [
                    "Fuel Pump, Fuel Tank & Turbo System"
                ]
            },
            {
                name: "Auto Electricals",
                subCategories: [
                    "Engine Sensors"
                ]
            },
            {
                name: "Cooling System",
                subCategories: [
                    "Coolant Reservoir Tanks & Parts", "Thermostat & Parts"
                ]
            }
        ]
    },
    {
        brand: "HOLSTEIN",
        logoUrl: "https://res.cloudinary.com/dpeocx0yy/image/upload/v1725343138/6352459fd9c79f7fd95826ac-holstein-parts-engine-crankshaft_mdqgf9.jpg",
        headings: "Replacement Parts",
        categories: [
            {
                name: "Brake Parts",
                subCategories: [
                    "ABS Parts"
                ]
            },
            {
                name: "Auto Electricals",
                subCategories: [
                    "Engine Sensors"
                ]
            }
        ]
    },
    {
        brand: "PUROLATOR",
        logoUrl: "https://res.cloudinary.com/dpeocx0yy/image/upload/v1725343166/Purolator_Logo.svg__ydupte.png",
        headings: "Replacement Parts",
        categories: [
            {
                name: "Filters",
                subCategories: [
                    "Engine Oil Filters", "Engine Air Filters", "Cabin Air Filters", "Fuel Filters"
                ]
            }
        ]
    },
    {
        brand: "KLEEN-FLO",
        logoUrl: "https://res.cloudinary.com/dpeocx0yy/image/upload/v1725343255/KleenFlo-9265_gvlqzz.jpg",
        headings: "Tools & Equipment",
        categories: [
            {
                name: "Shop Consumables & Tools",
                subCategories: [
                    "Lubrication Products"
                ]
            },
            {
                name: "Paint & Body Shop Equipment",
                subCategories: [
                    "Painting Equipment & Supplies"
                ]
            },
            {
                name: "Fluids & Lubricants",
                subCategories: [
                    "Brake & Power Steering Fluid", "Engine Additive & Cleaner"
                ]
            },
            {
                name: "Car Wash & Wax",
                subCategories: [
                    "Wash Cleaners", "Interior & Exterior Care Products", "Polish"
                ]
            },
            {
                name: "Industrial & Safety",
                subCategories: [
                    "Chemicals & Cleaners"
                ]
            },
            {
                name: "Farm Supplies",
                subCategories: [
                    "Fluids & Lubrication"
                ]
            },
            {
                name: "Industrial Supplies",
                subCategories: [
                    "Filters & Fluids"
                ]
            }
        ]
    },
    {
        brand: "SPECTRA PREMIUM",
        logoUrl: "https://res.cloudinary.com/dpeocx0yy/image/upload/v1725343272/logo-spectra-open-graph_tblthx.jpg",
        headings: "Replacement Parts",
        categories: [
            {
                name: "Cooling System Parts",
                subCategories: [
                    "Radiator", "Radiator Hoses", "Cooling System Parts"
                ]
            },
            {
                name: "Heating and Air Conditioning",
                subCategories: [
                    "Condenser", "Air Conditioning Compressor, Clutch & Idler Assembly",
                    "Air Conditioning Filter, Valve Condenser, Evaporator & Hose",
                    "Heater Valves, Heater Cores & Blowers", "Air Conditioning & Heater Switch & Relays",
                    "Air Conditioning Compressor Parts"
                ]
            },
            {
                name: "Fuel Delivery",
                subCategories: [
                    "Fuel Pump, Fuel Tank & Turbo System", "Fuel Injection"
                ]
            },
            {
                name: "Engine Components",
                subCategories: [
                    "Engines Oil Pan, Gasket & Drain Plugs"
                ]
            },
            {
                name: "Ignition System",
                subCategories: [
                    "Ignition Coils"
                ]
            },
            {
                name: "Auto Electricals",
                subCategories: [
                    "Engine Sensors"
                ]
            },
            {
                name: "Emission Control",
                subCategories: [
                    "Emission Parts", "EGR Valves & Parts", "DEF Parts"
                ]
            },
            {
                name: "Transmission Parts",
                subCategories: [
                    "Manual Transmission Parts", "Automatic Transmission Parts", "Transmission Assembly"
                ]
            }
        ]
    },
    {
        brand: "NOCO BATTERY CHARGERS",
        logoUrl: "https://res.cloudinary.com/dpeocx0yy/image/upload/v1725343297/noco_Logo_sbxuro.jpg",
        headings: "Tools & Equipment",
        categories: [
            {
                name: "Shop Consumables & Tools",
                subCategories: [
                    "Battery Chargers, Boosters and Power Packs"
                ]
            }
        ]
    },
    {
        brand: "FOUR SEASONS",
        logoUrl: "https://res.cloudinary.com/dpeocx0yy/image/upload/v1725343325/4seasonslogo_cmyksm_p1aokt.png",
        headings: "Replacement Parts",
        categories: [
            {
                name: "Heating and Air Conditioning",
                subCategories: [
                    "Condenser", "Air Conditioning Compressor, Clutch & Idler Assembly",
                    "Air Conditioning Filter, Valve Condenser, Evaporator & Hose",
                    "Heater Valves, Heater Cores & Blowers", "Air Conditioning & Heater Switch & Relays",
                    "Air Conditioning Compressor Parts"
                ]
            },
            {
                name: "Cooling System Parts",
                subCategories: [
                    "Coolant Reservoir Tanks & Parts", "Radiator Hoses", "Water Pumps",
                    "Thermostat & Parts", "Cooling System Parts"
                ]
            },
            {
                name: "Auto Electricals",
                subCategories: [
                    "Computers & Modules"
                ]
            },
            {
                name: "Automotive Belts",
                subCategories: [
                    "Belt Tensioners", "Tensioner Assembly", "Idler Pulleys"
                ]
            },
            {
                name: "Transmission Parts",
                subCategories: [
                    "Manual Transmission Parts", "Automatic Transmission Parts", "Transmission Assembly"
                ]
            },
            {
                name: "Steering System",
                subCategories: [
                    "Steering Parts", "Power Steering Pumps & Hoses", "Power Steering Kits and Seals"
                ]
            },
            {
                name: "Fluids & Lubricants",
                subCategories: [
                    "Cooling Chemicals", "Refrigerant", "AC Compressor Oil"
                ]
            }
        ]
    },
    {
        brand: "ANCO",
        logoUrl: "https://res.cloudinary.com/dpeocx0yy/image/upload/v1725343345/Anco-Logo_pblq0q.jpg",
        headings: "Replacement Parts",
        categories: [
            {
                name: "Wipers & Parts",
                subCategories: [
                    "Wiper Blades", "Wiper Arms", "Wiper Refills", "Washer Pumps", "Washer Nozzles"
                ]
            }
        ]
    },
    {
        brand: "SYNERGY BY WORLDPARTS",
        logoUrl: "https://res.cloudinary.com/dpeocx0yy/image/upload/v1725343364/synergy-logo-500x300-2_byyii2.jpg",
        headings: "Replacement Parts",
        categories: [
            {
                name: "Brake Parts",
                subCategories: [
                    "Brake Pads"
                ]
            }
        ]
    },
    {
        brand: "MAGNAFLOW",
        logoUrl: "https://res.cloudinary.com/dpeocx0yy/image/upload/v1725343598/455-4555468_thumb-image-magnaflow-logo-png-transparent-png_mn5fsq.png",
        headings: "Replacement Parts",
        categories: [
            {
                name: "Exhaust Components",
                subCategories: [
                    "Mufflers", "Catalytic Converter", "Resonator", "Exhaust Pipes"
                ]
            }
        ]
    },
    {
        brand: "DNS ARMATURE",
        logoUrl: "https://res.cloudinary.com/dpeocx0yy/image/upload/v1725343617/logo-2_jqstnl.png",
        headings: "Replacement Parts",
        categories: [
            {
                name: "Brake Parts",
                subCategories: [
                    "Brake Calipers"
                ]
            },
            {
                name: "Cooling System Parts",
                subCategories: [
                    "Water Pumps"
                ]
            },
            {
                name: "Auto Electricals",
                subCategories: [
                    "Starter", "Alternator"
                ]
            }
        ]
    },
    {
        brand: "MAHLE",
        logoUrl: "https://res.cloudinary.com/dpeocx0yy/image/upload/v1725343636/mahle-gmbh-vector-logo-1_s4bpcq.png",
        headings: "Replacement Parts",
        categories: [
            {
                name: "Engine Components",
                subCategories: [
                    "Engine Gaskets & Seals", "Valve Train & Cylinder Head Parts", "Timing Parts & Camshafts",
                    "Engine Bearings", "Piston Rings", "Pistons, Oil Pumps & Block Parts",
                    "Gasket Set", "Engine Miscellaneous (Switch,Caps & Mounts)", "Engines & Kits"
                ]
            },
            {
                name: "Fuel Delivery",
                subCategories: [
                    "Carburetors", "Carburetor Kits & Parts", "Carburetor Choke & Parts",
                    "Fuel Injection", "Engine Filters & PCV", "Fuel Pump, Fuel Tank & Turbo System"
                ]
            },
            {
                name: "Auto Electricals",
                subCategories: [
                    "Engine Sensors"
                ]
            },
            {
                name: "Filters",
                subCategories: [
                    "Engine Oil Filters", "Engine Air Filters", "Cabin Air Filters", "Fuel Filters"
                ]
            },
            {
                name: "Heating and Air Conditioning",
                subCategories: [
                    "Condenser", "Air Conditioning Compressor, Clutch & Idler Assembly",
                    "Air Conditioning Filter, Valve Condenser, Evaporator & Hose",
                    "Heater Valves, Heater Cores & Blowers", "Air Conditioning & Heater Switch & Relays",
                    "Air Conditioning Compressor Parts"
                ]
            },
            {
                name: "Cooling System Parts",
                subCategories: [
                    "Radiator", "Coolant Reservoir Tanks & Parts", "Radiator Hoses", "Water Pumps",
                    "Thermostat & Parts", "Cooling System Parts"
                ]
            },
            {
                name: "Exhaust Components",
                subCategories: [
                    "Mufflers", "Catalytic Converter", "Resonator", "Exhaust Pipes", "Exhaust Gaskets"
                ]
            },
            {
                name: "Emission Control",
                subCategories: [
                    "Emission Parts", "EGR Valves & Parts"
                ]
            },
            {
                name: "Transmission Parts",
                subCategories: [
                    "Manual Transmission Parts", "Automatic Transmission Parts", "Transmission Assembly"
                ]
            }
        ]
    },
    {
        brand: "MAVAL",
        logoUrl: "https://res.cloudinary.com/dpeocx0yy/image/upload/v1725343661/Maval_k1itj8.jpg",
        headings: "Replacement Parts",
        categories: [
            {
                name: "Steering System",
                subCategories: [
                    "Steering Rack Assembly", "Steering Gear", "Power Steering Pumps & Hoses"
                ]
            }
        ]
    },
    {
        brand: "EXIDE",
        logoUrl: "https://res.cloudinary.com/dpeocx0yy/image/upload/v1725343683/logo-jpg-hi-resolution-scaled_dhgwtn.jpg",
        headings: "Replacement Parts",
        categories: [
            {
                name: "Auto Electricals",
                subCategories: [
                    "Batteries"
                ]
            }
        ]
    },
    {
        brand: "CLOYES",
        logoUrl: "https://res.cloudinary.com/dpeocx0yy/image/upload/v1725343700/Cloyes_wccupt.jpg",
        headings: "Replacement Parts",
        categories: [
            {
                name: "Engine Components",
                subCategories: [
                    "Valve Train & Cylinder Head Parts", "Timing Parts & Camshafts", "Pistons, Oil Pumps & Block Parts"
                ]
            }
        ]
    },
    {
        brand: "FELPRO",
        logoUrl: "https://res.cloudinary.com/dpeocx0yy/image/upload/v1725343716/fel_pro_logo_fvvwj8.jpg",
        headings: "Replacement Parts",
        categories: [
            {
                name: "Engine Components",
                subCategories: [
                    "Engine Gaskets & Seals", "Valve Train & Cylinder Head Parts", "Engines Oil Pan, Gasket & Drain Plugs", "Gasket Set"
                ]
            },
            {
                name: "Transmission Parts",
                subCategories: [
                    "Manual Transmission Parts", "Automatic Transmission Parts", "Transmission Assembly"
                ]
            },
            {
                name: "Exhaust Components",
                subCategories: [
                    "Exhaust Gaskets"
                ]
            },
            {
                name: "Fuel Delivery",
                subCategories: [
                    "Engine Filters & PCV"
                ]
            }
        ]
    },
    {
        brand: "MPA",
        logoUrl: "https://res.cloudinary.com/dpeocx0yy/image/upload/v1725343737/MPA-bug-proper-002_ubqbfj.jpg",
        headings: "Replacement Parts",
        categories: [
            {
                name: "Brake Parts",
                subCategories: [
                    "Brake Rotors", "Brake Pads", "Brake Calipers", "Brake Shoes",
                    "Brake Drums", "Brake Hydraulics", "Brake Hardware"
                ]
            },
            {
                name: "Auto Electricals",
                subCategories: [
                    "Starter", "Alternator"
                ]
            },
            {
                name: "Wheel Bearings & Hub Assembly",
                subCategories: [
                    "Wheel Bearings", "Hub Assembly"
                ]
            },
            {
                name: "Fuel Delivery",
                subCategories: [
                    "Fuel Pump, Fuel Tank & Turbo System"
                ]
            }
        ]
    },
    {
        brand: "ROCKLAND WORLDPARTS",
        logoUrl: "https://res.cloudinary.com/dpeocx0yy/image/upload/v1725343796/images-5_eu3w0d.jpg",
        headings: "Replacement Parts",
        categories: [
            {
                name: "Steering System",
                subCategories: [
                    "Steering Parts"
                ]
            },
            {
                name: "Wipers & Parts",
                subCategories: [
                    "Wiper Arms", "Wiper Motors"
                ]
            }
        ]
    },
    {
        brand: "SUNSONG",
        logoUrl: "https://res.cloudinary.com/dpeocx0yy/image/upload/v1725343818/sunsong_mbwult.jpg",
        headings: "Replacement Parts",
        categories: [
            {
                name: "Steering System",
                subCategories: [
                    "Power Steering Pumps & Hoses"
                ]
            },
            {
                name: "Brake Parts",
                subCategories: [
                    "Brake Hydraulics", "Brake Hardware"
                ]
            },
            {
                name: "Engine Components",
                subCategories: [
                    "Pistons, Oil Pumps & Block Parts", "Engines & Kits"
                ]
            },
            {
                name: "Transmission Parts",
                subCategories: [
                    "Manual Transmission Parts", "Automatic Transmission Parts", "Transmission Assembly"
                ]
            }
        ]
    },
    {
        brand: "DEWALT",
        logoUrl: "https://res.cloudinary.com/dpeocx0yy/image/upload/v1725343837/DeWalt_Logo.svg__rcpxnj.png",
        headings: "Tools & Equipment",
        categories: [
            {
                name: "Automotive Service Tools",
                subCategories: [
                    "Hand Tools", "Power Tools", "Electric tools", "Tool Boxes, Chests and Carts",
                    "Dollies, Pallet Trucks and Work Benches"
                ]
            },
            {
                name: "Agricultural & Heavy Industrial Products",
                subCategories: [
                    "Agricultural Equipment", "Generators"
                ]
            },
            {
                name: "Shop Consumables & Tools",
                subCategories: [
                    "Battery Chargers, Boosters and Power Packs", "Shop Equipment", "Flashlights & Worklights",
                    "Measuring Tools"
                ]
            },
            {
                name: "Industrial & Safety",
                subCategories: [
                    "Safety", "Protection Apparel"
                ]
            },
            {
                name: "Farm Supplies",
                subCategories: [
                    "Hardware & Equipment", "Parts & Accessories"
                ]
            },
            {
                name: "Industrial Supplies",
                subCategories: [
                    "Parts & Accessories"
                ]
            }
        ]
    },
    {
        brand: "STRONGARM",
        logoUrl: "https://res.cloudinary.com/dpeocx0yy/image/upload/v1725343858/StrongLogo_reo7xr.png",
        headings: "Replacement Parts",
        categories: [
            {
                name: "Body Parts & Accessories",
                subCategories: [
                    "Doors & Hardware"
                ]
            }
        ]
    },
    {
        brand: "STANLEY TOOLS",
        logoUrl: "https://res.cloudinary.com/dpeocx0yy/image/upload/v1725343876/Stanley-Logo_n7wysl.png",
        headings: "Tools & Equipment",
        categories: [
            {
                name: "Automotive Service Tools",
                subCategories: [
                    "Hand Tools", "Power Tools", "Vises", "Electric tools", "Tool Boxes, Chests and Carts",
                    "Dollies, Pallet Trucks and Work Benches"
                ]
            },
            {
                name: "Shop Consumables & Tools",
                subCategories: [
                    "Battery Chargers, Boosters and Power Packs", "Fume Extraction and Dust Collection Systems",
                    "Compressors and Hoses", "Flashlights & Worklights", "Measuring Tools"
                ]
            },
            {
                name: "Paint & Body Shop Equipment",
                subCategories: [
                    "Painting Equipment & Supplies", "Paint Booths & Aspiration Equipment"
                ]
            },
            {
                name: "Agricultural & Heavy Industrial Products",
                subCategories: [
                    "Generators"
                ]
            },
            {
                name: "Industrial & Safety",
                subCategories: [
                    "Safety", "Protection Apparel"
                ]
            },
            {
                name: "Heavy Duty Trucks Supplies",
                subCategories: [
                    "Fasteners", "Construction Supplies"
                ]
            }
        ]
    },
    {
        brand: "DYNAMIC SAFETY INC",
        logoUrl: "https://res.cloudinary.com/dpeocx0yy/image/upload/v1725343896/ISHN0916FDO_F3_pic_dnahup.jpg",
        headings: "Industrial & Safety",
        categories: [
            {
                name: "Safety",
                subCategories: [
                    "Protection Apparel", "First Aid Kits"
                ]
            }
        ]
    },
    {
        brand: "TIMBREN",
        logoUrl: "https://res.cloudinary.com/dpeocx0yy/image/upload/v1725343915/timbren_lasco_sgbvb2.jpg",
        headings: "Tools & Equipment",
        categories: [
            {
                name: "Agricultural & Heavy Industrial Products",
                subCategories: [
                    "Trailer Parts and Accessories"
                ]
            },
            {
                name: "Replacement Parts",
                subCategories: [
                    "Suspension Parts", "Air Suspension", "Shocks & Strut Hardware"
                ]
            }
        ]
    },
    {
        brand: "HAYDEN",
        logoUrl: "https://res.cloudinary.com/dpeocx0yy/image/upload/v1725343932/hayden_logo-1_hpjvff.jpg",
        headings: "Replacement Parts",
        categories: [
            {
                name: "Cooling System Parts",
                subCategories: [
                    "Radiator"
                ]
            },
            {
                name: "Automotive Belts",
                subCategories: [
                    "Belt Tensioners", "Tensioner Assembly", "Idler Pulleys"
                ]
            },
            {
                name: "Engine Components",
                subCategories: [
                    "Valve Train & Cylinder Head Parts", "Timing Parts & Camshafts"
                ]
            },
            {
                name: "Transmission Parts",
                subCategories: [
                    "Manual Transmission Parts", "Automatic Transmission Parts"
                ]
            }
        ]
    },
    {
        brand: "RICHPORTER",
        logoUrl: "https://res.cloudinary.com/dpeocx0yy/image/upload/v1725343975/images-1-1_rhzh2n.png",
        headings: "Replacement Parts",
        categories: [
            {
                name: "Ignition System",
                subCategories: [
                    "Ignition Coils"
                ]
            },
            {
                name: "Auto Electricals",
                subCategories: [
                    "Engine Sensors"
                ]
            }
        ]
    }
];

export default suppliers
