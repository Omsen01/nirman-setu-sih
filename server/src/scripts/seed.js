import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import { connectDB } from '../config/db.js'
import User from '../models/User.js'
import Worker from '../models/Worker.js'
import Tender from '../models/Tender.js'
import Company from '../models/Company.js'
import TenderApplication from '../models/TenderApplication.js'
import Inspection from '../models/Inspection.js'
import Portfolio from '../models/Portfolio.js'
import Opportunity from '../models/Opportunity.js'

dotenv.config()

const workers = [
  { name: 'Rajesh Kumar', role: 'Mason & RCC Professional', emoji: '👷', header: 'orange', avatarBg: 'orange', rating: 4.8, reviews: 124, exp: 10, location: 'Sagar, MP', verified: true, topRated: true, skills: ['Brickwork', 'RCC', 'Plaster', 'Tile Work'], category: 'railway', about: 'Railway siding and RCC specialist with 10+ years on bridge and platform projects.', projectsCompleted: 42, available: true },
  { name: 'Vikram Singh', role: 'Railway Track Electrician', emoji: '⚡', header: 'gold', avatarBg: 'gold', rating: 4.7, reviews: 203, exp: 15, location: 'Delhi', verified: true, topRated: false, skills: ['Signalling', 'Overhead Wiring', 'Panel Board'], category: 'railway', about: 'Signalling and OHE specialist for railway electrification projects.', projectsCompleted: 58, available: true },
  { name: 'Amit Patel', role: 'Civil Engineer (Bridges)', emoji: '📐', header: 'blue', avatarBg: 'blue', rating: 4.6, reviews: 67, exp: 12, location: 'Mumbai', verified: true, topRated: false, skills: ['Structural Design', 'Estimation', 'BOQ', 'Railway Bridges'], category: 'railway', about: 'Structural engineer for railway bridges, ROBs and approach roads.', projectsCompleted: 31, available: true },
  { name: 'Mahesh Gupta', role: 'Road Contractor & Site Supervisor', emoji: '🏗️', header: 'orange', avatarBg: 'teal', rating: 4.8, reviews: 312, exp: 18, location: 'Pune', verified: true, topRated: true, skills: ['Highway Construction', 'Asphalt', 'Labour Management'], category: 'road', about: 'Highway and road contractor with 18 years across NH and state highways.', projectsCompleted: 76, available: true },
  { name: 'Arun Thakur', role: 'Road & Bridge Welder', emoji: '🔩', header: 'gold', avatarBg: 'orange', rating: 4.6, reviews: 87, exp: 14, location: 'Bangalore', verified: true, topRated: false, skills: ['Arc Welding', 'MIG Welding', 'MS Fabrication', 'Crash Barriers'], category: 'road', about: 'Welding specialist for road furniture, crash barriers and culverts.', projectsCompleted: 63, available: true },
  { name: 'Neha Joshi', role: 'Highway Surveyor & AutoCAD', emoji: '🖥️', header: 'teal', avatarBg: 'gold', rating: 4.7, reviews: 74, exp: 6, location: 'Hyderabad', verified: true, topRated: false, skills: ['Surveying', 'AutoCAD', 'Leveling', 'Estimation'], category: 'road', about: 'Surveyor for road alignment and earthwork measurement.', projectsCompleted: 29, available: true },
  { name: 'Priya Sharma', role: 'Water Project Engineer', emoji: '💧', header: 'teal', avatarBg: 'teal', rating: 4.9, reviews: 89, exp: 8, location: 'Bhopal, MP', verified: true, topRated: true, skills: ['Pipeline', 'WTP', 'Pumping Stations', 'Distribution Network'], category: 'water', about: 'Water supply engineer for Jal Jeevan Mission pipeline and WTP projects.', projectsCompleted: 24, available: true },
  { name: 'Suresh Yadav', role: 'Plumber & WTP Operator', emoji: '🔧', header: 'gold', avatarBg: 'orange', rating: 4.5, reviews: 98, exp: 12, location: 'Lucknow', verified: false, topRated: false, skills: ['Pipeline Jointing', 'Valves', 'Check Dams'], category: 'water', about: 'Pipeline and water treatment plant plumbing specialist.', projectsCompleted: 41, available: true },
  { name: 'Ramesh Verma', role: 'Water Tank & Structure Builder', emoji: '🏗️', header: 'teal', avatarBg: 'gold', rating: 4.9, reviews: 156, exp: 20, location: 'Jaipur', verified: true, topRated: true, skills: ['ESR Towers', 'Underground Sumps', 'RCC Tanks'], category: 'water', about: 'Elevated storage reservoir and sump construction expert.', projectsCompleted: 55, available: true },
  { name: 'Sunil Verma', role: 'Residential Mason & Finisher', emoji: '🧱', header: 'teal', avatarBg: 'gold', rating: 4.7, reviews: 141, exp: 9, location: 'Gwalior, MP', verified: true, topRated: false, skills: ['Brickwork', 'Plaster', 'Flooring', 'Tile Work'], category: 'residential', about: 'Home construction specialist — from foundation to finishing.', projectsCompleted: 38, available: true },
  { name: 'Deepa Nair', role: 'Interior Designer', emoji: '🛋️', header: 'gold', avatarBg: 'teal', rating: 4.8, reviews: 96, exp: 11, location: 'Indore', verified: true, topRated: true, skills: ['Interior Design', 'Modular Kitchen', '3D Modeling'], category: 'residential', about: 'End-to-end home interior design and execution.', projectsCompleted: 67, available: true },
  { name: 'Mohan Lal', role: 'Electrician (Home)', emoji: '⚡', header: 'orange', avatarBg: 'orange', rating: 4.6, reviews: 178, exp: 16, location: 'Bhopal, MP', verified: true, topRated: false, skills: ['Wiring', 'Smart Home', 'Solar', 'Repairs'], category: 'residential', about: 'Home electrical wiring, smart automation and solar installation.', projectsCompleted: 120, available: true },
]

const tenders = [
  { tenderId: 'NS-TR-2026-014', title: 'Construction of 12m Span RCC Road Overbridge — NH-44 Section', department: 'PWD / NHAI', location: 'Sagar, Madhya Pradesh', value: '₹10.5 Cr', deadline: 'Oct 28, 2026', published: 'Sep 12, 2026', category: 'Road & Bridge', status: 'Open', description: 'Design and construction of a 12m span RCC bridge including approach roads, earthwork, PCC/mastic paving and crash barriers.', eligibility: [{ item: 'Experience: 3 similar bridge/ROB projects in last 7 years', met: true }, { item: 'Minimum annual turnover ₹25 Cr in last 3 financial years', met: true }, { item: 'Registration: CPWD / State PWD approved contractor (Class A)', met: true }, { item: 'Technical staff: certified structural engineer on team', met: true }, { item: 'Equipment: crawler crane ≥ 25T, concrete pump', met: true }, { item: 'Performance: no blacklisting / poor performance records', met: true }] },
  { tenderId: 'NS-TR-2026-011', title: 'Rural Water Supply & Treatment Plant (10 MLD)', department: 'Jal Nigam', location: 'Jabalpur, Madhya Pradesh', value: '₹24 Cr', deadline: 'Nov 05, 2026', published: 'Sep 05, 2026', category: 'Water Infrastructure', status: 'Open', description: 'Construction of 10 MLD water treatment plant with intake well, pump house, settling tanks and 35 km distribution network under Jal Jeevan Mission.', eligibility: [{ item: 'Experience: 2 water infra projects ≥ ₹15 Cr in last 7 years', met: true }, { item: 'Minimum annual turnover ₹30 Cr in last 3 financial years', met: false }, { item: 'Registration: valid contractor license in relevant class', met: true }, { item: 'Technical staff: water-treatment experienced engineers', met: true }, { item: 'Financial capacity: net worth ≥ ₹12 Cr', met: false }, { item: 'EMD: ₹60 Lakh via bank guarantee or deposit', met: true }] },
  { tenderId: 'NS-TR-2026-009', title: 'Construction of 4-Lane State Highway (18 km)', department: 'State Highway Authority', location: 'Indore–Dewas, Madhya Pradesh', value: '₹68 Cr', deadline: 'Dec 12, 2026', published: 'Aug 20, 2026', category: 'Road & Bridge', status: 'Open', description: 'Widening and pavement of 18 km section to 4 lanes including 3 minor bridges, culverts, drainage and road furniture.', eligibility: [{ item: 'Experience: 2 highway projects ≥ ₹50 Cr in last 7 years', met: true }, { item: 'Minimum annual turnover ₹90 Cr in last 3 financial years', met: false }, { item: 'Registration: Class AA contractor with state authority', met: true }, { item: 'Technical staff: qualified highway engineers & surveyor', met: true }, { item: 'Equipment: asphalt plant, paver, rollers (owned fleet preferred)', met: true }, { item: 'Performance: valid ISO 9001 certified contractor', met: true }] },
  { tenderId: 'NS-TR-2026-006', title: 'Government School Campus Development (20 Schools)', department: 'Education Dept.', location: 'Gwalior Division, MP', value: '₹6.2 Cr', deadline: 'Oct 18, 2026', published: 'Aug 02, 2026', category: 'Buildings', status: 'Open', description: 'Development of school infrastructure across 20 sites — classrooms, toilets, boundary walls, water storage and repairs.', eligibility: [{ item: 'Experience: educational building projects ≥ ₹3 Cr', met: true }, { item: 'Minimum annual turnover ₹8 Cr in last 3 financial years', met: true }, { item: 'Registration: Class B contractor license', met: true }, { item: 'Technical staff: site engineers & safety officer', met: true }, { item: 'Equipment: mixed fleet with own vehicles', met: true }, { item: 'Performance: previous govt. projects completed on time', met: true }] },
  { tenderId: 'NS-TR-2026-003', title: 'Smart City Street Lighting & Public Wi-Fi', department: 'Smart City Mission', location: 'Ujjain, Madhya Pradesh', value: '₹9.8 Cr', deadline: 'Nov 20, 2026', published: 'Jul 15, 2026', category: 'Electrical / ICT', status: 'Open', description: 'GPS-synchronised LED street lighting on 120 km of roads with centralised control system and 40 public Wi-Fi hotspots with 5-year O&M.', eligibility: [{ item: 'Experience: smart lighting / ICT projects ≥ ₹5 Cr', met: true }, { item: 'Minimum annual turnover ₹12 Cr in last 3 financial years', met: true }, { item: 'Registration: electrical contractor license; EPE certification', met: true }, { item: 'Technical staff: electrical + network engineers', met: true }, { item: 'Equipment: boom lifts, cable laying machinery', met: false }, { item: 'Performance: no defaults on previous Smart City tenders', met: true }] },
]

const companies = [
  { name: 'Rajesh Construction Services', type: 'Contractor', emoji: '🏗️', avatarBg: 'orange', rating: 4.8, reviews: 87, exp: 12, location: 'Sagar, Madhya Pradesh', verified: true, description: 'Full-service civil contracting firm specialising in residential and commercial RCC structures.', services: ['RCC', 'Brickwork', 'Full Turnkey', 'Labour Contracting'], contact: { phone: '+91 90000 11111', email: 'contact@rajeshconstruction.in', website: 'rajeshconstruction.in', address: 'Sagar, MP' }, team: [{ name: 'Rajesh Kumar', role: 'Director', profession: 'Mason & RCC Professional', experience: '12 yrs', emoji: '👷' }, { name: 'Sunil Verma', role: 'Site Manager', profession: 'Mason', experience: '9 yrs', emoji: '🧱' }], licenses: [{ title: 'Class A Contractor License', number: 'MP-CL-4471', issued: '2021', expiry: '2026', verified: true }] },
  { name: 'Sharma & Associates Architects', type: 'Architecture Firm', emoji: '📐', avatarBg: 'teal', rating: 4.9, reviews: 42, exp: 15, location: 'Bhopal, Madhya Pradesh', verified: true, description: 'Award-winning architecture firm delivering residential, commercial and institutional design.', services: ['Architecture', '3D Design', 'Vastu', 'Building Plans'], contact: { phone: '+91 90000 22222', email: 'hello@sharmaassoc.in', website: 'sharmaassoc.in', address: 'Bhopal, MP' }, team: [{ name: 'Priya Sharma', role: 'Principal Architect', profession: 'Architect', experience: '15 yrs', emoji: '📐' }], licenses: [{ title: 'COA Registration', number: 'CA-2021-88', issued: '2021', expiry: 'Lifetime', verified: true }] },
  { name: 'National Steel & Materials Pvt Ltd', type: 'Material Supplier', emoji: '🏭', avatarBg: 'teal', rating: 4.6, reviews: 134, exp: 20, location: 'Nagpur, Maharashtra', verified: true, description: 'Leading distributor of TMT steel, cement, aggregates and tiles with pan-state delivery.', services: ['TMT Steel', 'Cement', 'Sand & Aggregate', 'Tiles'], contact: { phone: '+91 90000 33333', email: 'sales@nationalsteel.in', website: 'nationalsteel.in', address: 'Nagpur, MH' }, team: [{ name: 'Mahesh Gupta', role: 'Managing Director', profession: 'Materials & Logistics', experience: '20 yrs', emoji: '🏭' }], licenses: [{ title: 'GST Registered Dealer', number: 'GST-27AAA111', issued: '2015', expiry: 'Ongoing', verified: true }] },
]

const demoUsers = [
  { name: 'Demo Customer', mobile: '9000000001', email: 'customer@nirman.setu', pin: '1234', role: 'customer', avatar: '👤' },
  { name: 'Demo Professional', mobile: '9000000002', email: 'pro@nirman.setu', pin: '1234', role: 'business', subRole: 'professional', avatar: '👷' },
  { name: 'Demo Government', mobile: '9000000003', email: 'gov@nirman.setu', pin: '1234', role: 'business', subRole: 'government', avatar: '🏛️' },
  { name: 'Demo Corporate', mobile: '9000000004', email: 'corp@nirman.setu', pin: '1234', role: 'business', subRole: 'corporate', avatar: '🏢' },
]

export async function runSeed() {
  await connectDB()
  console.log('[seed] clearing existing data...')
  await Promise.all([User.deleteMany({}), Worker.deleteMany({}), Tender.deleteMany({}), Company.deleteMany({}), TenderApplication.deleteMany({}), Inspection.deleteMany({}), Portfolio.deleteMany({}), Opportunity.deleteMany({})])

  console.log('[seed] inserting workers...')
  await Worker.insertMany(workers)

  console.log('[seed] inserting tenders...')
  await Tender.insertMany(tenders)

  const compDocs = await Company.insertMany(companies)
  console.log('[seed] inserting portfolio + opportunities...')
  await Portfolio.insertMany([
    { company: compDocs[0]._id, name: 'Sharma Residence', description: 'G+1 RCC residential construction, 1500 sqft.', photos: [], completionDate: '2025-03-01', services: 'RCC, Brickwork, Finishing', status: 'Previous', outcome: 'Completed on time, 4.8★' },
    { company: compDocs[0]._id, name: 'Sagar School Block', description: 'School campus development across 3 sites.', photos: [], completionDate: '2025-08-15', services: 'Turnkey', status: 'Previous', outcome: 'Handed over before session start' },
    { company: compDocs[0]._id, name: 'Nirman Heights (Ongoing)', description: '6-storey commercial tower — RCC shell.', photos: [], services: 'RCC & Structure', status: 'Ongoing', outcome: 'Progress 46%' },
  ])
  await Opportunity.insertMany([
    { company: compDocs[0]._id, title: 'Hiring Masons — Greater Sagar', kind: 'Employment', description: '10+ masons needed for commercial tower. Daily wages + bonus.', location: 'Sagar, MP', active: true },
    { company: compDocs[0]._id, title: 'Subcontract — RCC Works', kind: 'Contract', description: 'RCC subcontracting for residential towers up to G+6.', location: 'Bhopal, MP', active: true },
  ])

  console.log('[seed] inserting demo users...')
  for (const u of demoUsers) {
    await User.create({ ...u, pin: await bcrypt.hash(u.pin, 10), isVerified: true })
  }

  console.log('[seed] inserting sample application + inspection...')
  const tender = await Tender.findOne({})
  const corpUser = await User.findOne({ subRole: 'corporate' })
  const app = await TenderApplication.create({ applicant: corpUser._id, applicantName: 'Demo Corporate', company: compDocs[0].name, tender: tender._id, tenderId: tender.tenderId, status: 'Inspection Pending', verified: true })
  await Inspection.create({ application: app._id, projectName: tender.title, location: tender.location, inspectorName: 'Demo Government', organization: 'Nirman SETU PIU', steps: [{ name: 'Project Details Verified', completed: true, notes: 'All details match tender' }, { name: 'Document Verification', completed: true, notes: 'GST, PAN, license verified' }, { name: 'Site Evidence', completed: false }, { name: 'Photo/Video Upload', completed: false }, { name: 'Inspection Notes', completed: false }, { name: 'Inspector Verification', completed: false }, { name: 'Final Report', completed: false }], status: 'In Progress' })

  console.log('[seed] done!')
  console.log('  Customer login:    9000000001 / PIN 1234  (OTP 123456)')
  console.log('  Professional login: 9000000002 / PIN 1234')
  console.log('  Government login:   9000000003 / PIN 1234')
  await mongoose.disconnect()
}

// Auto-seed only when this file is invoked directly (`npm run seed`).
const isDirect = process.argv[1] && process.argv[1].endsWith('seed.js')
if (isDirect) {
  runSeed().catch((err) => { console.error(err); process.exit(1) })
}

export default runSeed