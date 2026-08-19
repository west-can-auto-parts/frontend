"use client"

import React, { useState, useEffect, useRef } from 'react'
import { FaMagnifyingGlass, FaBars, FaCar, FaHeart, FaPersonCircleCheck, FaCartShopping, FaXmark, FaWhatsapp, FaChevronRight, FaChevronDown, FaWarehouse } from 'react-icons/fa6';
import { GaragePanel } from './_components/GaragePanel';
import { fetchUserSession, deleteGarageVehicle } from '@/lib/userSessionApi';
import { parseGarageVehicles, vehicleToSearchParams, vehicleToDeletePayload, vehicleToKey } from '@/lib/parseGarageVehicles';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import PreHeader from './PreHeader'
import HeaderMenu from './HeaderMenu'
import OnScrollHeader from '../OnScrollHeader/OnScrollNav'
import { BiUser } from 'react-icons/bi';
import { UserButton } from './_components/user-button'
import { Logo } from '../Logo'
import { useCart } from '@/app/CartContext';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Shop All', href: '/categories' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Contact', href: '/contact-us' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'Careers', href: '/careers' },
  { label: 'FAQs', href: '/faqs' },
];

const YEARS = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i);

const MAKES_MODELS = {
Cadillac: ['CT4', 'CT5', 'CT6', 'XT4', 'XT5', 'XT6', 'LYRIQ', 'OPTIQ', 'ESCALADE IQ', 'CTS', 'Escalade', 'Escalade ESV', 'H2', 'Escalade EXT', 'Safari', 'DTS', 'DeVille', 'XTS', 'STS', 'Grand Prix', 'Bonneville', 'SRX', 'Lucerne', 'ATS', 'C3500HD', 'Firebird', 'GTO', 'P30', 'P3500'],
Chevrolet: ['Silverado 1500', 'Blazer', 'Trax', 'Trailblazer', 'Camaro', 'Equinox', 'Malibu', 'Canyon', 'Blazer EV', 'Colorado', 'Equinox EV', 'Bolt EUV', 'Bolt EV', 'Corvette', 'Silverado 2500 HD', 'Silverado 3500 HD', 'Cruze', 'Silverado 1500 LTD', 'Silverado EV', 'Suburban', 'Tahoe', 'Volt', 'Suburban 1500', 'Suburban 2500', 'Silverado 1500 LD', 'Silverado', 'Impala', 'Bravada', 'Hombre', 'Jimmy', 'S10', 'Sonoma', 'Alero', 'Classic', 'Cutlass', 'Grand Am', 'Astro', 'Avalanche 1500', 'Avalanche 2500', 'Express 1500', 'Express 2500', 'Silverado 1500 Classic', 'Silverado 1500 HD', 'Silverado 1500 HD Classic', 'Silverado 2500', 'Silverado 2500 HD Classic', 'Silverado 3500', 'Trailblazer EXT', 'Cobalt', 'G5', 'Ion', 'Pursuit', 'Express 3500', 'Impala Limited', 'Aura', 'G6', 'HHR', 'i-280', 'i-290', 'i-350', 'i-370', 'Avalanche', 'Relay', '3', '3 Sport', '5', '9-3', 'C-Max', 'EcoSport', 'Escape', 'Focus', 'Sky', 'Solstice', 'Transit Connect', 'Vanden Plas', 'XF', 'XJ', 'XJ8', 'XJR', 'XK', 'XKR', 'Captiva Sport', 'Torrent', 'Vue', 'XL-7', 'Caprice', 'G8', 'SS', 'Malibu Limited', 'Orlando', 'Cruze Limited', 'Sonic', 'City Express', 'LEAF', 'NV200', 'Spark', 'Silverado 3500 Classic', 'Monte Carlo', 'Suburban 3500 HD', 'Express 4500'],
GMC: ['Silverado 1500 LTD', 'Terrain', 'Colorado', 'Acadia', 'Canyon', 'Hummer EV Pickup', 'Hummer EV SUV', 'Sierra 1500', 'Sierra 2500 HD', 'Sierra 3500 HD', 'Sierra 1500 Limited', 'Sierra EV', 'Yukon', 'Yukon XL', 'Yukon XL 1500', 'Yukon XL 2500', 'Sierra', 'Savana 1500', 'Savana 2500', 'Sierra 1500 Classic', 'Sierra 1500 HD', 'Sierra 1500 HD Classic', 'Sierra 2500', 'Sierra 2500 HD Classic', 'Sierra 3500', 'Sierra 3500 Classic', 'Envoy', 'Envoy XL', 'Envoy XUV', 'Acadia Limited', 'Savana 3500', 'Savana 4500'],
Hyundai: ['Santa Cruz', 'Santa Fe', 'Sonata', 'Tucson', 'Palisade', 'Elantra', 'Kona', 'Soul', 'K5', 'Ioniq 5', 'Ioniq 6', 'EV6', 'Elantra N', 'Ioniq 5 N', 'Genesis', 'Sportage', 'Santa Fe Sport', 'Tiburon', 'Azera', 'XG300', 'XG350', 'Accent', 'Entourage', 'Santa Fe XL', 'Equus', 'Genesis Coupe', 'Veracruz', 'Optima', 'Elantra Coupe', 'Elantra GT', 'Veloster', 'Ioniq', 'Venue', 'Kona Electric', 'Nexo', 'Cadenza', 'Veloster N'],
Kia: ['K5', 'Sorento', 'Sportage', 'Cadenza', 'Sedona', 'Telluride', 'K900', 'Stinger', 'Carnival', 'K4', 'Seltos', 'Venue', 'Sonata', 'Soul', 'Niro', 'Tucson', 'Optima', 'Forte', 'Forte5', 'Magentis', 'Amanti', 'Rio', 'Rio5', 'Borrego', 'Rondo', 'Forte Koup', 'Soul EV', 'Niro EV', 'Veloster N'],
Buick: ['Envision', 'Encore', 'Encore GX', 'Envista', 'Enclave', 'Traverse', 'ATS', 'LaCrosse', 'Regal Sportback', 'Regal TourX', 'Cruz', 'Aurora', 'Bonneville', 'Century', 'DeVille', 'Eldorado', 'Grand Prix', 'Intrigue', 'LeSabre', 'Montana', 'Monte Carlo', 'Park Avenue', 'Regal', 'Riviera', 'Seville', 'Silhouette', 'Trans Sport', 'Venture', 'Alero', 'Allure', 'Aztek', 'Cutlass Supreme', 'Grand Am', 'Lumina', 'Rendezvous', 'SC1', 'SC2', 'SL', 'SL1', 'SL2', 'SW1', 'SW2', 'Ascender', 'Bravada', 'Rainier', 'SSR', 'Outlook', 'Relay', 'Terraza', 'Uplander', 'DTS', 'Lucerne', '9-5', 'Cascada', 'ELR', 'Verano', 'SRX', 'Vue', 'STS', 'XLR', '9-7x', 'Caprice', 'G8', 'GTO', 'H2', 'H3', 'H3T', 'SS', 'i-370', 'i-280', 'i-290', 'i-350', 'Aura', 'G5', 'G6', 'HHR', 'Ion', 'Sky', 'Solstice', 'Grand Vitara', 'Torrent', 'XL-7'],
Land_Rover: ['Defender 110', 'Defender 90', 'Discovery', 'Discovery Sport', 'Range Rover', 'Range Rover Sport', 'Range Rover Evoque', 'Range Rover Velar', 'Defender 130', 'LR4', 'LR2'],
Subaru: ['BRZ', 'Crosstrek', 'Forester', 'Impreza', 'Legacy', 'Outback', 'Ascent', 'WRX', 'Impreza. XV Crosstrek', 'Baja', 'B9 Tribeca', 'Tribeca', 'XV Crosstrek', 'XV', '2017-2022 Subaru Impreza; 2018-2018 Subaru Forester; 2018-2019 Subaru Legacy; 2018-2019 Subaru Outback; 2018-2022 Subaru Crosstrek; 2018-2022 Subaru WRX; 2018-2022 Subaru Xv; 2018-2024 Subaru Ascent; 2019-2023 Subaru Forester; 2020-2024 Subaru Outback'],
Nissan: ['Sentra', 'Frontier', 'Kicks', 'Rogue', 'Versa', 'Armada', 'GT-R', 'QX80', 'Z', 'Quest', 'Altima', 'Xterra', 'Equator', 'Pathfinder', 'Juke', 'Kizashi', 'Maxima', 'Rogue Select', 'Micra', 'Versa Note', 'LEAF', 'Qashqai', 'Rogue Sport', 'TITAN', 'TITAN XD', 'NV200', 'Murano', 'Titan', 'Juke; Quest', 'Q70-LWB; QX80; Armada;', 'Kicks; Sentra; Versa', 'QX50'],
INFINITI: ['Armada', 'Q50', 'Q60', 'QX80', 'Z', 'ARIYA', 'Outlander', 'Outlander PHEV', 'Pathfinder', 'QX60', 'Rogue', 'Altima', 'G20', 'I30', 'Maxima', 'Sentra', '350Z', 'G35', 'Juke', 'Cube', 'I35', 'SX4', 'Versa', '370Z', 'EX35', 'EX37', 'FX35', 'FX37', 'FX45', 'G25', 'G37', 'M35', 'M35h', 'M37', 'M45', 'M56', 'Murano', 'Q40', 'Q45', 'Q70', 'Q70L', 'QX50', 'QX70', 'Grand Vitara', 'JX35', 'LEAF', 'Qashqai', 'Quest', 'Rogue Select', 'Rogue Sport', 'X-Trail', 'Commander', 'Grand Cherokee', 'Pathfinder Armada', 'QX56', 'TITAN', 'FX50', 'Equator', 'TITAN XD', 'QX30', 'Kicks', 'QX55', 'Versa Note'],
Genesis: ['G70', 'G80', 'G90', 'GV80', 'EV6', 'GV60', 'Tuscon', 'Velostor', 'Genesis'],
Mitsubishi: ['Outlander', 'Outlander PHEV', 'Outlander Sport', 'RVR', 'Mirage', 'Mirage G4', 'Eclipse Cross', 'Lancer', 'Eclipse', 'Galant'],
Ford: ['Explorer', 'Explorer Sport Trac', 'Liberty', 'Mountaineer', 'TJ', 'Wrangler', 'Escape', 'Bronco Sport', 'Corsair', 'Expedition', 'Maverick', 'Bronco', 'F-150', 'F-150 Lightning', 'Navigator', 'Mustang', 'EcoSport', 'Fiesta', 'E-Transit', 'Transit-150', 'Transit-250', 'Transit-350', 'Transit-350 HD', 'Ranger', 'Aviator', 'Police Interceptor Utility', 'E-350 Super Duty', 'F-250 Super Duty', 'F-350 Super Duty', 'Fusion', 'Transit Connect', 'Continental', 'Flex', 'MKS', 'MKT', 'Taurus', 'Police Interceptor Sedan', 'Edge', 'MKZ', 'Focus', 'GT', 'MKX', 'Nautilus', 'Special Service Police Sedan', 'B2300', 'B3000', 'B4000', 'Explorer Sport', 'Crown Victoria', 'Grand Marquis', 'Marauder', 'Town Car', 'Freestar', '3', 'C-Max', 'Five Hundred', 'Freestyle', 'Montego', 'Sable', 'Taurus X', 'X-Type', '6', 'Milan', 'Zephyr', 'CX-5', 'CX-7', 'CX-9', '2', 'MKC', '1500', 'Mustang Mach-E', 'E-150', 'E-250', 'E-450 Super Duty', 'MV-1', 'Mariner', 'Transit', 'Tribute', 'F-450 Super Duty', 'F-550 Super Duty', 'F-600 Super Duty', 'F53', 'F59', 'F650', 'F750', 'Ford Police Interceptor Utility', 'Ford F-150', 'Ford Transit-350', '2015-2017 Ford F-150 Reg/Ext; 2015-2019 Ford F-150 Lobo Supe; 2015-2019 Ford F-150 SuperCrew; 2015-2023 Ford Edge; 2015-2023 Ford Mustang; 2016-2019 Ford Explorer; 2016-2020 Lincoln MKX; 2017-2018 Ford Fusion; 2017-2021 Lincoln Continental; 2018-2020 Lincoln MKC; 2018-2020 Lincoln MKZ; 2018-2023 Ford Ecosport; 2018-2023 Ford Transit Connect; 2019-2019 Lincoln Nautilus; 2019-2021 Ford Fusion; 2020-2020 Ford E-Series; 2020-2020 Lincoln Nautilus', 'Police Responder Hybrid', 'SSV Plug-In Hybrid'],
Lincoln: ['MKC', 'MKZ', 'Navigator', 'Nautilus', 'Aviator', 'Mark LT'],
Jeep: ['Compass', '1500', 'Grand Wagoneer', 'Grand Wagoneer L', 'Wagoneer', 'Wagoneer L', 'Wrangler', 'Gladiator', 'Grand Cherokee', 'Grand Cherokee L', 'Grand Cherokee WK', 'Cherokee', 'Liberty', 'TJ', 'Commander', 'Renegade', 'Patriot'],
Honda: ['CR-V', 'Civic', 'Insight', 'Pilot', 'Accord', 'HR-V', 'Integra', 'MDX', 'RDX', 'TLX', 'Odyssey', 'ILX', 'TL', 'CR-Z', 'Fit', 'TSX', 'Clarity', 'Passport', 'Ridgeline', 'Crosstour'],
Toyota: ['Corolla', 'C-HR', 'Sequoia', 'Tacoma', 'Tundra', 'Grand Highlander', 'Prius', 'Prius Prime', 'NX250', 'NX350', 'NX350h', 'RX350', 'RX350h', 'RX500h', 'RAV4', 'UX200', 'Prius AWD-e', 'Prius C', 'Camry', 'Land Cruiser', 'tC', 'Avalon', 'Solara', 'Highlander', 'Sienna', 'FR-S', 'Yaris', 'Venza', 'Celica', 'Matrix', 'MR2 Spyder', 'S60', 'XC70', 'Mirai', 'RX450h', 'ES350', 'RX350L', 'LS500', 'ES300h', 'LC500', 'RC F', 'RX450hL', 'GS F', 'LS50H', 'LC500h', 'Vibe', '86', 'Yaris iA'],
Mazda: ['3', 'CX-30', 'CX-5', '6', 'CX-9', 'Mariner', 'Miata', 'Protege', 'Protege5', 'RX-8', 'MPV', 'MX-5 Miata', 'Fiesta', 'CX-3', '3 Sport', 'Yaris', 'Yaris iA', 'iA', 'CX-50', 'C-HR', 'Corolla', 'Prius', 'Prius AWD-e', 'Prius Prime', 'RAV4', 'RAV4 Prime', 'Venza', 'CX-7'],
Tesla: ['3', 'Y'],
Lexus: ['Grand Highlander', 'Highlander', 'RX350', 'RX350h', 'RX450h+', 'TX350', 'Corolla', 'Crown', 'IS300', 'IS350', 'IS500', 'NX250', 'NX350', 'NX350h', 'NX450h+', 'RAV4 Prime', 'RC300', 'RC350', 'RX500h', 'RZ450e', 'Sienna', 'TX500h', 'TX550h+', 'bZ4X', '4Runner', 'GX550', 'LX600', 'LX700h', 'Land Cruiser', 'Sequoia', 'Tacoma', 'Tundra', 'Prius', 'Prius AWD-e', 'Prius Prime', 'UX250h', 'UX300h', 'Avalon', 'Camry', 'ES300h', 'RAV4', 'Venza', 'Celica', 'ES300', 'RX300', 'Solara', 'FJ Cruiser', 'GX460', 'GX470', 'LX450', 'GS300', 'GS400', 'GS430', 'SC430', 'LX470', 'LS430', 'ES330', 'IS250', 'RX330', 'RX400h', 'GS350', 'GS450h', 'GS460', 'CT200h', 'Prius Plug-In', 'HS250h', 'Matrix', 'Prius V', 'Vibe', 'xB', 'xD', 'ES350', 'LS460', 'LS500', 'LS500h', 'LS600h', 'Mirai', 'LX570', 'NX200t', 'NX300', 'NX300h', 'RX350L', 'RX450h', 'RX450hL', 'GS200t', 'IS200t', 'RC200t', 'Corolla iM', 'Yaris', 'iM', 'tC', 'C-HR', 'Corolla Cross', 'ES250', 'UX200', 'GH350', 'LC500h', 'LC500', 'GS F', 'RC F', 'LX470 2006', 'GX470 2006'],
Acura: ['MDX', 'RDX', 'ILX', 'TSX', 'Accord', 'CL', 'Civic', 'Insight', 'CR-V', 'Element', 'Legend', 'Oasis', 'Odyssey', 'RL', 'TL', 'CR-Z', 'Integra', 'Kizashi', 'Prelude', 'RSX', 'S2000', 'SX4', 'Pathfinder', 'Q45', 'QX4', 'Quest', 'X-Trail', 'Pilot', 'Fit', 'Accord Crosstour', 'Crosstour', 'Ridgeline', 'RLX', 'ZDX', 'Passport', 'TLX', 'Clarity', 'NSX', 'HR-V'],
Chrysler: ['Grand Caravan', 'Grand Cherokee', 'Grand Cherokee L', 'Pacifica', 'Voyager', '300', 'Challenger', 'Charger', 'Magnum', '1500', 'Durango', 'Gladiator', 'Grand', 'Caravan', 'Promaster 1500', '2500', '3500', 'Wranger', '3000GT', 'Avenger', 'Diamante', 'Eclipse', 'Galant', 'Sebring', 'Stealth', 'Stratus', 'Summit', 'Talon', 'Expo', 'Mirage', 'Neon', 'Liberty', 'Town & Country', '200', 'Caliber', 'Compass', 'Lancer', 'Outlander', 'Outlander Sport', 'Patriot', 'RVR', 'Endeavor', 'Montero', '1500 Classic', 'Aspen', 'Ram 1500', 'Ram 1500 Van', 'Dakota', 'C/V', 'Journey', 'Nitro', 'Routan', 'Wrangler', 'Cherokee', 'Dart', '500', '4500', '500L', 'ProMaster 1500', 'ProMater 2500', 'ProMater 3500', 'Viper', '500X', 'ProMaster City', 'Renegade', 'ProMaster 2500', 'ProMaster 3500', 'Wrangler JK'],
BMW: ['530e', '530e xDrive', '530i', '530i xDrive', '540i', '540i xDrive', '740i', '740i xDrive', '745Le xDrive', '745e xDrive', '750i xDrive', '840i', '840i Gran Coupe', '840i xDrive', '840i xDrive Gran Coupe', 'Alpina B7', 'Alpina XB7', 'M5', 'M550i xDrive', 'M760Li xDrive', 'M760i xDrive', 'M8', 'M8 Gran Coupe', 'M850i xDrive', 'M850i xDrive Gran Coupe', 'X5', 'X6', 'X7', 'XM', '135i', '135is', '335i', '335i xDrive', '335is', 'X1', 'Z4', '228i Gran Coupe', '228i xDrive Gran Coupe', '230i', '230i xDrive', '330e', '330e xDrive', '330i', '330i GT Drive', '300i xDrive', '340i', '340i GT xDrive', '340i xDrive', '430i', '430i Gran Coupe', '430i xDrive', '430i xDrive Gran Coupe', '440i', '440i Gran Coupe', '440i xDrive', '440i xDrive Gran Coupe', '540i 540i xDrive', '640i xDrive Gran Turismo', '740e xDrive', 'Cooper', 'Cooper Clubman', 'Cooper Countryman', 'i8', 'M2', 'm235i xDrive Gran Coupe', 'M240i', 'M240i xDrive', 'M3', 'M340i', 'M340i xDrive', 'M4', 'M440i', 'M440i Gran Coupe', 'M440i xDrive', 'M440i xDrive Gran Coupe', 'X2', 'X3', 'X4', '550i GT xDrive', '650i', '650i Gran Coupe', '650i xDrive', '650i xDrive Gran Coupe', '750i', 'Alpina B6 xDrive Gran Coupe', 'M550 xDrive', 'M6', 'M6 Gran Coupe', '1 Series M', '335xi', '535i', '535i xDrive', '535xi', '540i xDrive 740i', '740Li', '330i xDrive', 'GR Supra', 'i4', '128i', '323i', '328i', '328i xDrive', '328xi', '330xi', '528i', '528i xDrive', '528xi', '228i', '228i xDrive', '320i', '320i xDrive', '328i GT xDrive', '428i', '428i Gran Coupe', '428i xDrive', '428i xDrive Gran Coupe', '435i', '435i xDrive', '325i', '325xi', '525i', '525xi', '530xi', '535i GT', '535i GT xDrive', '335i GT xDrive', '435i Gran Coupe', '435i xDrive Gran Coupe', '550i', '550i GT', '550i xDrive', '640i', '640i Gran Coupe', '640i xDrive', '640i xDrive Gran Coupe', '740Li xDrive', '750Li', '750Li xDrive', '760Li', 'ActiveHybrid 3', 'ActiveHybrid 5', 'ActiveHybrid 7', 'Alpina B7L', 'Alpina B7L xDrive', 'Alpina B7 xDrive', 'Cooper Paceman', 'M235i', 'M235i xDrive', 'Ghost', '2017-2018 BMW 5-Series; 2017-2018 Mercedes-Benz CLS; 2017-2024 Mercedes-Benz E-Clas; 2018-2018 BMW 7-Series; 2018-2018 BMW X4; 2018-2024 BMW 6-Series GT; 2018-2024 BMW X3; 2018-2025 Mercedes-Benz CLS; 2019-2022 BMW 7-Series; 2019-2024 BMW 5-Series; 2019-2025 BMW X4; 2019-2025 Mercedes-Benz GLE; 2019-2025 Mercedes-Benz GT-4; 2019-2026 BMW 3-Series; 2019-2026 BMW 8-Series; 2019-2026 BMW X5; 2019-2026 BMW Z4; 2019-2026 Mercedes-Benz A-Clas; 2019-2026 Rolls-Royce Cullinan; 2019-2028 BMW X7; 2019-2028 Mercedes-Benz Sprint; 2020-2025 Mercedes-Benz CLA; 2020-2026 BMW 1-Series; 2020-2026 BMW X6; 2020-2026 Mercedes-Benz GLS; 2020-2026 Toyota Supra; 2020-2027 Mercedes-Benz Glb; 2020-2027 Mercedes-Benz Gle Co; 2021-2027 Mercedes-Benz Gla', '330i GT xDrive', '540d xDrive', '535d', '535d xDrive', '740Ld xDrive'],
Audi: ['ID.4', 'Q4 e-tron', 'Q4 e-tron Sportback', 'A3 Sportback E-Tron', 'Golf', 'Jetta', 'A3', 'A3 Quattro', 'A4', 'A4 Allroad', 'A4 Quattro', 'A5 Quattro', 'A5 Sportback', 'A6', 'A6 Allroad', 'A6 Quattro', 'A7 Quattro', 'A7 Sportback', 'A8 Quattro', 'Arteon', 'Atlas', 'Atlas Cross Sport', 'Beetle', 'Cayenne', 'Golf Alltrack', 'Golf R', 'Golf SportWagen', 'Gti', 'Macan', 'Panamera', 'Passat', 'Q3', 'Q5', 'Q5 Sportback', 'Q7', 'Q8', 'RS3', 'RS5', 'RS5 Sportback', 'RS6 Avant', 'RS7 Sportback', 'S3', 'S4', 'S5', 'S5 Sportback', 'S6', 'S7', 'S7 Sportback', 'SQ7', 'SQ8', 'Tiguan', 'TT RS Quattro', 'TT Quattro', 'CC', 'Passat CC', 'RS7', 'S8', 'Touareg', 'Eos', 'GTI', 'Rabbit', 'TT', 'TTS Quattro', 'Tiguan Limited', 'A5', 'allroad', 'R32', 'A4 allroad', 'SQ5', 'A6 allroad', 'SQ5 Sportback', 'A3 Sportback e-tron', 'Q5 PHEV', 'e-Golf', 'A8'],
Ram: ['1500', '1500 Classic', '2500', '3500', 'Wrangler', 'ProMaster 1500', 'ProMaster 2500', 'ProMaster 3500', '4500', '5500', 'ProMaster City'],
Mercedes_Benz: ['CLS450', 'CLS53 AMG', 'E300', 'E400', 'E43 AMG', 'E450', 'E53 AMG', 'GLC300', 'GLC350e', 'GLC43 AMG', 'Maybach S560', 'Maybach S650', 'S450', 'S560', 'S560e', 'S63 AMG', 'S65 AMG', 'Metris', 'Sprinter 1500', 'Sprinter 2500', 'Sprinter 3500', 'Sprinter 3500XD', 'GLE350', 'GLE450', 'GLE53 AMG', 'GLE580', 'GLE63 AMG S', 'GLS450', 'GLS580', 'GLS63 AMG', 'A220', 'A35 AMG', 'CLA250', 'CLA35 AMG', 'CLA45 AMG', 'GLA250', 'GLA35 AMG', 'GLA45 AMG', 'GLB250', 'GLB35 AMG', 'B250', 'B250E', 'C230', 'C250', 'C280', 'C300', 'C350', 'C63 AMG', 'CL550', 'CL600', 'CL63 AMG', 'CL65 AMG', 'CLK350', 'CLK500', 'CLK55 AMG', 'CLK550', 'CLK63 AMG', 'CLS550', 'CLS63 AMG', 'E350', 'E550', 'E63 AMG', 'Fortwo', 'G500', 'G55 AMG', 'G550', 'G63 AMG', 'GL350', 'GL450', 'GL550', 'GL63 AMG', 'GLK250', 'GLK350', 'ML350', 'ML450', 'ML550', 'ML63 AMG', 'Maybach S550', 'Maybach S600', 'R350', 'R550', 'S350', 'S400', 'S550', 'S600', 'SL550', 'SL63 AMG', 'SL65 AMG', 'SLK250', 'SLK280', 'SLK300', 'SLK350', 'SLK55 AMG', 'SLS AMG', 'CLS63 AMG S', 'E63 AMG S', 'GLE63 AMG', 'GLS550', 'C43 AMG', 'C400', 'C450 AMG', 'GLE43 AMG', 'GLE400', 'GLE450 AMG', 'GLE550e', 'ML400', 'S550e', 'SL400', 'SL450', 'SLC43 AMG', 'CLS400', 'AMG GT 63', 'AMG GT 63 S', 'C63 AMG S', 'C350e', 'GLC63 AMG', 'GLC63 AMG S', 'GLE300d', 'GLS350d', 'ML250', 'AMG GT 53', 'E250', 'GL320', 'ML320', 'R320'],
Infinity: ['QX50', 'QX55'],
Dodge: ['Durango', 'PT Cruiser', 'Stratus', 'Dakota', 'Ram 1500', 'Ram 1500 Van', 'Ram 2500 Van', 'Ram 3500 Van', 'Charger', 'Magnum', 'Liberty', 'Nitro', 'Wrangler', 'Wrangler JK', 'Grand Cherokee', 'Grand Cherokee WK', 'Dart', 'Routan', 'Armada', 'EX35', 'EX37', 'FX35', 'FX37', 'G25', 'G35', 'G37', 'GT-R', 'Grand Caravan', 'M35', 'M45', 'Q40', 'Q50', 'Q60', 'QX50', 'QX56', 'QX70', 'QX80', 'TITAN', 'TITAN XD', '2500', '3500', '4500', '5500', 'Ram 2500', 'Ram 3500', 'Ram 4500', 'Ram 5500'],
Suzuki: ['Grand Vitara', 'Sidekick', 'XL-7', 'Aerio', 'Forenza', 'Reno', 'SX4'],
Scion: ['Celica', 'Echo', 'MR2 Spyder', 'Prius', 'iQ', 'xA', 'xB', '86', 'FR-S', 'Yaris', 'Yaris iA', 'iA', 'Corolla', 'Corolla iM', 'iM', 'tC', 'TC'],
Pontiac: ['Celica', 'Corolla', 'Matrix', 'Vibe', 'Torrent', 'Terraza', 'Corolla iM', 'Mirai', 'RAV4', 'iM', 'tC', 'G8', 'LeSabre'],
Mercury: ['Tribute', 'Mountaineer', 'Monterey', 'Mariner'],
Saturn: ['Vue', 'Uplander'],
Saab: ['9-2X'],
Hummer: ['H3', 'H3T'],
Fiat: ['124 Spider', '500X', 'Compass', 'Renegade'],
Volkswagen: ['Town & Country', 'Beetle', 'Golf', 'Jetta', 'Rabbit', 'GTI', 'Golf Alltrack', 'Golf SportWagen', 'Passat', 'Atlas', 'Atlas Cross Sport', 'Tiguan'],
Volvo: ['C40 Recharge', 'XC40', 'XC40 Recharge', 'S60', 'S60 Cross Country', 'S80', 'S90', 'V60', 'V60 Cross Country', 'V90 Cross Country', 'XC60', 'XC70', 'XC90', 'C30', 'C70', 'S40', 'V50', 'V70', 'V90'],
Various: ['Various'],
Alfa_Romeo: ['Cherokee', 'Giulia', 'Stelvio', 'Wrangler'],
Mini: ['Cooper', 'Cooper Countryman', 'Cooper Paceman'],
TBD: ['TBD'],
TOYOTA: ['ES300; ES350; GX460; IS350; LC500; LS500; LX570; NX200t; NX300h; RC300h; RC350; RCF; RX350; RX450; UX; 4-Runner; Camry; CHR; Corolla; Land Cruiser']
};

const VehicleSelector = ({ onClose }) => {
  const router = useRouter();
  const [year, setYear] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [submodel, setSubmodel] = useState('');
  const [engine, setEngine] = useState('');

  const models = make ? (MAKES_MODELS[make] || []) : [];
  const isValid = Boolean(year && make && model);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isValid) return;

    const params = new URLSearchParams({ year, make, model });
    if (submodel) params.set('submodel', submodel);
    if (engine) params.set('engine', engine);

    onClose();
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[520px] max-w-[95vw] bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
      <div className="bg-[#b91c1c] px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FaCar className="text-white text-lg" />
          <span className="text-white font-bold text-sm tracking-wide">Find Parts For Your Vehicle</span>
        </div>
        <button
          onClick={onClose}
          className="text-white/70 hover:text-white transition-colors"
          aria-label="Close vehicle selector"
        >
          <FaXmark className="text-base" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-5 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Year <span className="text-[#b91c1c]">*</span>
            </label>
            <div className="relative">
              <select
                value={year}
                onChange={(event) => setYear(event.target.value)}
                className="w-full appearance-none border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#b91c1c] focus:border-[#b91c1c] cursor-pointer pr-8"
              >
                <option value="">Select Year</option>
                {YEARS.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
              <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Make <span className="text-[#b91c1c]">*</span>
            </label>
            <div className="relative">
              <select
                value={make}
                onChange={(event) => {
                  setMake(event.target.value);
                  setModel('');
                }}
                className="w-full appearance-none border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#b91c1c] focus:border-[#b91c1c] cursor-pointer pr-8"
              >
                <option value="">Select Make</option>
                {Object.keys(MAKES_MODELS).map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
              <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Model <span className="text-[#b91c1c]">*</span>
          </label>
          <div className="relative">
            <select
              value={model}
              onChange={(event) => setModel(event.target.value)}
              disabled={!make}
              className="w-full appearance-none border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#b91c1c] focus:border-[#b91c1c] cursor-pointer pr-8 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              <option value="">{make ? 'Select Model' : 'Select a Make first'}</option>
              {models.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
            <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Submodel <span className="text-gray-300 font-normal">(optional)</span>
            </label>
            <input
              type="text"
              value={submodel}
              onChange={(event) => setSubmodel(event.target.value.toUpperCase())}
              placeholder="e.g. SE, GL, LX"
              className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#b91c1c] focus:border-[#b91c1c] placeholder:text-gray-300"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Engine <span className="text-gray-300 font-normal">(optional)</span>
            </label>
            <input
              type="text"
              value={engine}
              onChange={(event) => setEngine(event.target.value)}
              placeholder="e.g. 1.6L L4"
              className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#b91c1c] focus:border-[#b91c1c] placeholder:text-gray-300"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className="w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed enabled:bg-[#b91c1c] enabled:text-white enabled:hover:bg-red-800 enabled:shadow-md enabled:shadow-red-100"
        >
          <FaMagnifyingGlass className="text-xs" />
          Search Parts
          {isValid && <FaChevronRight className="text-xs" />}
        </button>

        {!isValid && (
          <p className="text-center text-xs text-gray-400">Year, Make, and Model are required</p>
        )}
      </form>
    </div>
  );
};

const MainContent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVehicleOpen, setIsVehicleOpen] = useState(false);
  const [isGarageOpen, setIsGarageOpen] = useState(false);
  const [garageVehicles, setGarageVehicles] = useState([]);
  const [garageLoading, setGarageLoading] = useState(false);
  const [garageError, setGarageError] = useState(null);
  const [garageDeletingKey, setGarageDeletingKey] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const searchBoxRef = useRef(null);
  const vehicleSelectorRef = useRef(null);
  const garageRef = useRef(null);

  const router = useRouter();
  const { itemCount } = useCart();

  const isProduction = process.env.NODE_ENV === 'production';
  const apiUrl = isProduction
    ? 'https://clientsidebackend.onrender.com/api'
    : 'http://localhost:8080/api';

  function stringToSlug(str) {
    str = str.replace("&", "and");
    str = str.replace(/,/g, "~");
    return str
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 -~]/g, "")
      .replace(/\s+/g, "-")
      .replace(/--+/g, "-");
  }

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const handleSearch = async (query) => {
    if (query.length < 3) {
      setSearchResults(null);
      setShowResults(false);
      return;
    }
    const slug = stringToSlug(query);
    try {
      const response = await fetch(
      `${apiUrl}/suggestions?prefix=${encodeURIComponent(slug)}&limit=10`,
      { headers: { Accept: "application/json" } }
    );
      if (!response.ok) {
        console.error('Search API returned an error:', response.status);
        setSearchResults(null);
        setShowResults(false);
        return;
      }

      const data = await response.json();
      setSearchResults(data);
      setShowResults(true);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResults(null);
      setShowResults(false);
    }
  };

  const handleClickOutside = (event) => {
    if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
      setSearchQuery('')
      setShowResults(false);
    }
    if (vehicleSelectorRef.current && !vehicleSelectorRef.current.contains(event.target)) {
      setIsVehicleOpen(false);
    }
    if (garageRef.current && !garageRef.current.contains(event.target)) {
      setIsGarageOpen(false);
    }
  };

  const loadGarageVehicles = async () => {
    setGarageLoading(true);
    setGarageError(null);
    try {
      const session = await fetchUserSession();
      setGarageVehicles(parseGarageVehicles(session));
    } catch (err) {
      console.error('Error loading garage:', err);
      setGarageError('Could not load your garage. Please try again.');
      setGarageVehicles([]);
    } finally {
      setGarageLoading(false);
    }
  };

  const handleGarageToggle = () => {
    const willOpen = !isGarageOpen;
    setIsGarageOpen(willOpen);
    if (willOpen) {
      setIsVehicleOpen(false);
      loadGarageVehicles();
    }
  };

  const handleVehicleToggle = () => {
    const willOpen = !isVehicleOpen;
    setIsVehicleOpen(willOpen);
    if (willOpen) setIsGarageOpen(false);
  };

  const handleGarageVehicleSelect = (vehicle) => {
    setIsGarageOpen(false);
    router.push(`/search?${vehicleToSearchParams(vehicle).toString()}`);
  };

  const handleGarageVehicleDelete = async (vehicle) => {
    const key = vehicleToKey(vehicle);
    setGarageDeletingKey(key);
    setGarageError(null);
    try {
      await deleteGarageVehicle(vehicleToDeletePayload(vehicle));
      setGarageVehicles((previous) =>
        previous.filter((item) => vehicleToKey(item) !== key),
      );
    } catch (err) {
      console.error('Error deleting garage vehicle:', err);
      setGarageError('Could not remove this vehicle. Please try again.');
    } finally {
      setGarageDeletingKey(null);
    }
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query.length >= 3) {
      handleSearch(query); // Pass the query string, not the event object
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };


  const handleSearchSubmit = async (event) => {
    event.preventDefault(); // Prevent form submission
    if (searchQuery.length < 3) {
      return;
    }
    const slug = stringToSlug(searchQuery);

    try {
      const response = await fetch(
      `${apiUrl}/suggestions?prefix=${encodeURIComponent(slug)}&limit=10`,
      { headers: { Accept: "application/json" } }
    );
      if (!response.ok) {
        console.error('Search API returned an error:', response.status);
        setSearchResults(null);
        setShowResults(false);
        return;
      }

      const data = await response.json();
      setSearchResults(data);
      setShowResults(true);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResults(null);
      setShowResults(false);
    }
  };


  const handleResultClick = (listing, category) => {
    const categorySlug = category === 'Replacement Parts' || category === 'Fluids & Lubricants'
      ? 'replacement-parts'
      : 'shop-supplies';
      const slug = stringToSlug(listing)
    // Navigate to the specific product page with category and subcategory
    router.push(`/${categorySlug}/${slug}`);
  };

  const handleSubCategoryClick = (listing) => {
    router.push(`/shop/${listing}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Reset the search bar on scroll
      setSearchQuery("");
      setShowResults(false);
      setIsVehicleOpen(false);
      setIsGarageOpen(false);

      // Update navbar visibility based on scroll direction
      setShowNavbar(currentScrollY > prevScrollY && currentScrollY > 100);
      setPrevScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollY]);

  useEffect(() => {
    // Add event listener to detect clicks outside
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='w-full border-b-2 border-[#00000010] py-1 md:py-4'>
      <div className="w-10/12 mx-auto flex gap-6 justify-between">
        <div className="flex items-center gap-8">
          <FaBars className='w-5 h-5 lg:hidden' onClick={toggleMenu} />
          <div className={`fixed inset-y-0 w-full px-4 left-0 overflow-y-auto bg-gray-100 z-50 transition-transform transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`} style={{ transition: 'transform 0.3s ease-out' }}>
            <div className='py-2 my-2 flex justify-between gap-6 items-center'>
              <p className='font-bold text-lg'>Menu</p>
              <FaXmark className='h-5 w-5' onClick={toggleMenu} />
            </div>
            <div className="flex justify-between gap-4">
              <button className='w-full flex items-center gap-2 text-xs  px-2 py-2 shadow-md rounded-md bg-gray-200 font-semibold'>
                <BiUser className='w-5 h-5 rounded-full bg-red-800 text-white p-1' /> Sign In / Register
              </button>
              <button className='w-full flex items-center gap-2 text-xs  px-2 py-2 shadow-md rounded-md bg-gray-200 font-semibold'>
                <FaWhatsapp className='w-6 h-6  rounded-full bg-green-700 text-white p-1' /> WhatsApp Us
              </button>
            </div>
            <ul className="list-none border-b border-gray-300 py-2 mb-2">
              {navItems.map((item) => (
                <li key={item.href} className='py-1 my-2'>
                  <Link href={item.href} className='block text-sm font-semibold text-gray-700'>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="image-container">
            <Link href={'/'}>
              <Logo className='w-[75px] lg:w-[125px] h-auto' priority />
            </Link>
          </div>
          <div className='hidden md:flex gap-2 items-center h-fit'>
            <form className="relative" ref={searchBoxRef} onSubmit={handleSearchSubmit}>
              <input
                type="text"
                className='bg-gray-100 h-full pl-4 pr-2 py-2 gap-4 w-[300px] lg:w-[500px]'
                placeholder='Enter Keyword or Part Number'
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button type='submit' className='absolute top-1/2 right-2 transform -translate-y-1/2'>
                <FaMagnifyingGlass className='w-5 h-5 text-gray-600' />
              </button>
              {showResults && (searchResults?.ProductCategory?.length > 0 || searchResults?.SubCategory?.length > 0) && (
                <div className='absolute top-full mt-2 bg-white border border-gray-300 shadow-lg z-50 w-full'>
                  {/* Render ProductCategory Results */}
                  {searchResults.ProductCategory?.length > 0 && (
                    <div>
                      <h3 className='font-bold text-lg px-2 py-1'>Product Categories</h3>
                      {searchResults.ProductCategory.map((product) => (
                        <div
                          key={product.id}
                          className='p-2 hover:bg-gray-100 cursor-pointer'
                          onClick={() => {
                            handleResultClick(product.name, product.categoryName); // Example href generation for ProductCategory
                            setShowResults(false);
                          }}
                        >
                          <p className='font-semibold'>{product.name}</p>
                          {/* <p className='text-sm text-gray-600'>{product.description}</p> */}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Render SubCategory Results */}
                  {searchResults.SubCategory?.length > 0 && (
                    <div>
                      <h3 className='font-bold text-lg px-2 py-1'>Sub Categories</h3>
                      {searchResults.SubCategory.map((subcategory) => (
                        <div
                          key={subcategory.id}
                          className='p-2 hover:bg-gray-100 cursor-pointer'
                          onClick={() => {
                            handleSubCategoryClick(subcategory.name); // Example href generation for SubCategory
                            setShowResults(false);
                          }}
                        >
                          <p className='font-semibold'>{subcategory.name}</p>
                          {/* <p className='text-sm text-gray-600'>{subcategory.description}</p> */}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </form>
            <div className="flex items-center gap-2 shrink-0">
            <div className="relative" ref={vehicleSelectorRef}>
              <button
                type="button"
                onClick={handleVehicleToggle}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold whitespace-nowrap transition-colors ${isVehicleOpen ? 'bg-[#b91c1c] text-white border-[#b91c1c]' : 'bg-white text-gray-700 border-gray-300 hover:border-[#b91c1c] hover:text-[#b91c1c]'}`}
              >
                <FaCar className="text-base" />
                <span>Find by Vehicle</span>
                <FaChevronDown className={`text-xs transition-transform ${isVehicleOpen ? 'rotate-180' : ''}`} />
              </button>
              {isVehicleOpen && <VehicleSelector onClose={() => setIsVehicleOpen(false)} />}
            </div>
              <div className="relative" ref={garageRef}>
                <button
                  type="button"
                  onClick={handleGarageToggle}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold whitespace-nowrap transition-colors ${isGarageOpen ? 'bg-[#b91c1c] text-white border-[#b91c1c]' : 'bg-white text-gray-700 border-gray-300 hover:border-[#b91c1c] hover:text-[#b91c1c]'}`}
                  aria-expanded={isGarageOpen}
                  aria-haspopup="listbox"
                >
                  <FaWarehouse className="text-base" />
                  <span>Garage</span>
                  <FaChevronDown className={`text-xs transition-transform ${isGarageOpen ? 'rotate-180' : ''}`} />
                </button>
                {isGarageOpen && (
                  <GaragePanel
                    vehicles={garageVehicles}
                    loading={garageLoading}
                    error={garageError}
                    deletingKey={garageDeletingKey}
                    onSelectVehicle={handleGarageVehicleSelect}
                    onDeleteVehicle={handleGarageVehicleDelete}
                    onClose={() => setIsGarageOpen(false)}
                    onRetry={loadGarageVehicles}
                  />
                )}
              </div>
              <Link
                href="/cart"
                className="relative flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold whitespace-nowrap transition-colors bg-white text-gray-700 border-gray-300 hover:border-[#b91c1c] hover:text-[#b91c1c]"
                aria-label={itemCount > 0 ? `Go to cart, ${itemCount} items` : "Go to cart"}
              >
                <FaCartShopping className="text-base" />
                <span>Cart</span>
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 min-w-[1.25rem] h-5 px-1 flex items-center justify-center rounded-full bg-[#b91c1c] text-white text-[10px] font-bold leading-none">
                    {itemCount > 99 ? "99+" : itemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        <div className='flex gap-4 items-center'>
          <div className='flex gap-2 items-center'>
            <div className='hidden md:block bg-green-500 text-white rounded-md md:rounded-full p-2'>
              <FaWhatsapp className='h-6 w-6' />
            </div>
            <Link href={'https://wa.me/16045948800'} target='_blank' className='hidden md:flex items-center justify-end gap-2'>
              <div className='hidden lg:block'>
                <p className="text-xs text-gray-500">Chat With Us </p>
                <p className='font-semibold'>On WhatsApp</p>
              </div>
            </Link>
          </div>
          <UserButton />
        </div>
      </div>
    </div>
  );
};

const Header = () => {
  return (
    <header>
      <PreHeader />
      <MainContent />
      <HeaderMenu />
      <OnScrollHeader />
    </header>
  )
}

export default Header;