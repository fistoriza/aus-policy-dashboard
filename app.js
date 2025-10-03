// Enhanced Australian Political Parties Dashboard with Public Opinion - FIXED VERSION

class EnhancedPoliticalDashboard {
    constructor() {
        this.data = null;
        this.currentPolicy = '';
        this.selectedForComparison = [];
        this.currentView = 'policy';
        this.showOpinionData = true;
        this.charts = {};
        
        document.addEventListener('DOMContentLoaded', () => this.init());
    }

    async init() {
        try {
            this.showLoading();
            await this.loadData();
            this.setupEventListeners();
            this.populatePolicySelector();
            this.showInfoPanel();
            this.setupCharts();
            console.log('Dashboard initialized successfully with', this.data.parties.length, 'parties');
        } catch (error) {
            console.error('Dashboard initialization error:', error);
            this.showError('Failed to load political party data.');
        }
    }

    async loadData() {
        try {
            // Use the provided data directly from the application_data_json
            this.data = {
                "policy_areas": ["Economy & Tax", "Healthcare", "Housing", "Climate & Energy", "Immigration", "Education", "Cost of Living", "Defence & Security", "Social Services", "Infrastructure", "Regional Australia", "Workers Rights", "Indigenous Affairs", "Technology & Innovation"],
                "parties": [
                    {
                        "name": "Australian Labor Party",
                        "leader": "Anthony Albanese",
                        "ideology": "Social Democracy",
                        "status": "Government (94 seats House, 29 Senate)",
                        "website": "https://www.alp.org.au",
                        "policies": {
                            "Economy & Tax": {"position": "Progressive Tax Reform", "details": "Income tax cuts for all taxpayers, corporate tax compliance, instant asset write-off ($20,000), superannuation tax on balances over $3M", "stance": "Centre-Left"},
                            "Healthcare": {"position": "Universal Healthcare Expansion", "details": "$8.5B Medicare investment, 50 more Medicare Urgent Care Clinics, reduce PBS co-payment to $25, bulk billing support", "stance": "Progressive"},
                            "Housing": {"position": "Social Housing Investment", "details": "1.2M new homes target, Help to Buy shared equity scheme, $10B Housing Australia Future Fund, foreign investor restrictions", "stance": "Progressive"},
                            "Climate & Energy": {"position": "Renewable Energy Transition", "details": "Net zero by 2050, renewable energy expansion, $2.3B home batteries program, no new coal plants", "stance": "Progressive"},
                            "Immigration": {"position": "Managed Migration", "details": "Balanced migration program, skilled worker focus, humanitarian intake maintained", "stance": "Moderate"},
                            "Education": {"position": "Public Education Investment", "details": "Increased school funding, free TAFE places, student debt relief (20% reduction proposed)", "stance": "Progressive"},
                            "Cost of Living": {"position": "Targeted Relief", "details": "Energy bill rebates, Medicare investments, cheaper medicines, tax cuts for working families", "stance": "Progressive"},
                            "Defence & Security": {"position": "Strong Alliance-Based", "details": "AUKUS partnership, increased defence spending, regional security focus", "stance": "Moderate"},
                            "Social Services": {"position": "Welfare System Strengthening", "details": "NDIS improvements, aged care reforms, disability support expansion", "stance": "Progressive"},
                            "Infrastructure": {"position": "Nation-Building Investment", "details": "Transport infrastructure, broadband expansion, renewable energy grid", "stance": "Progressive"},
                            "Regional Australia": {"position": "Regional Development", "details": "Infrastructure investment, regional healthcare, telecommunications improvement", "stance": "Supportive"},
                            "Workers Rights": {"position": "Pro-Union", "details": "Penalty rates protection, wage increases, industrial relations reform, multi-employer bargaining", "stance": "Progressive"},
                            "Indigenous Affairs": {"position": "Voice & Recognition", "details": "Indigenous voice implementation, closing the gap initiatives, cultural preservation", "stance": "Progressive"},
                            "Technology & Innovation": {"position": "Digital Economy", "details": "Tech sector investment, digital skills training, cybersecurity enhancement", "stance": "Progressive"}
                        }
                    },
                    {
                        "name": "Liberal Party of Australia",
                        "leader": "Sussan Ley",
                        "ideology": "Liberal Conservatism",
                        "status": "Opposition (28 seats House, 23 Senate)",
                        "website": "https://www.liberal.org.au",
                        "policies": {
                            "Economy & Tax": {"position": "Lower Taxes & Business Support", "details": "$2,000 small business tech bonus, fuel excise cut (25c/L), economic growth focus, reduced government spending", "stance": "Conservative"},
                            "Healthcare": {"position": "Private-Public Partnership", "details": "$9B Medicare investment, double mental health sessions (10 to 20), GP workforce expansion, bulk billing support", "stance": "Moderate"},
                            "Housing": {"position": "Supply-Side Solutions", "details": "500,000 new homes via infrastructure, first home buyer incentives, foreign investment restrictions (2 years)", "stance": "Moderate"},
                            "Climate & Energy": {"position": "Nuclear & Balanced Mix", "details": "Nuclear power (7 locations), gas expansion, renewable integration, $263B savings claimed vs Labor plan", "stance": "Conservative"},
                            "Immigration": {"position": "Controlled Migration", "details": "25% permanent migration cut, skilled worker priority, border security emphasis", "stance": "Conservative"},
                            "Education": {"position": "Choice & Standards", "details": "School choice support, vocational training emphasis, performance-based funding", "stance": "Conservative"},
                            "Cost of Living": {"position": "Tax Relief & Competition", "details": "Fuel excise cuts, tax reductions, reduced regulation, energy cost reductions via nuclear", "stance": "Conservative"},
                            "Defence & Security": {"position": "Strong Defence", "details": "2.5% GDP defence spending, AUKUS support, regional security leadership", "stance": "Conservative"},
                            "Social Services": {"position": "Efficient Targeted Support", "details": "NDIS efficiency improvements, means testing emphasis, private sector involvement", "stance": "Conservative"},
                            "Infrastructure": {"position": "Productive Infrastructure", "details": "Roads and rail priority, private sector partnerships, regional connectivity", "stance": "Conservative"},
                            "Regional Australia": {"position": "Strong Regional Focus", "details": "Mining sector support, agricultural protection, infrastructure investment, water infrastructure", "stance": "Supportive"},
                            "Workers Rights": {"position": "Flexibility & Business", "details": "Business flexibility, reduced union power, CFMEU crackdown, workplace productivity", "stance": "Conservative"},
                            "Indigenous Affairs": {"position": "Practical Reconciliation", "details": "Practical measures focus, constitutional recognition support, community-based solutions", "stance": "Moderate"},
                            "Technology & Innovation": {"position": "Market-Led Innovation", "details": "Private sector leadership, reduced regulation, digital infrastructure, AI and blockchain support", "stance": "Conservative"}
                        }
                    },
                    {
                        "name": "National Party",
                        "leader": "David Littleproud",
                        "ideology": "Conservative Agrarianism",
                        "status": "Coalition Partner (15 seats House, 4 Senate)",
                        "website": "https://www.nationals.org.au",
                        "policies": {
                            "Economy & Tax": {"position": "Regional Economic Development", "details": "Regional development fund, agricultural support, mining sector backing, reduced regulation", "stance": "Conservative"},
                            "Healthcare": {"position": "Rural Health Priority", "details": "Regional healthcare access, rural doctor incentives, telehealth expansion", "stance": "Moderate"},
                            "Housing": {"position": "Regional Housing Solutions", "details": "Regional housing development, infrastructure enabling, local solutions focus", "stance": "Moderate"},
                            "Climate & Energy": {"position": "Practical Energy Mix", "details": "Gas development, nuclear support, coal transition management, regional energy jobs", "stance": "Conservative"},
                            "Immigration": {"position": "Selective Migration", "details": "Regional migration programs, skilled agricultural workers, border security", "stance": "Conservative"},
                            "Education": {"position": "Rural Education Access", "details": "Rural school support, vocational training, agricultural education programs", "stance": "Conservative"},
                            "Cost of Living": {"position": "Regional Cost Pressures", "details": "Fuel cost relief, regional service access, transport cost reduction", "stance": "Conservative"},
                            "Defence & Security": {"position": "Rural-Military Connection", "details": "Defence bases in regional areas, veteran support, rural recruitment", "stance": "Conservative"},
                            "Social Services": {"position": "Rural Service Delivery", "details": "Regional service access, aged care in regions, disability support rural areas", "stance": "Moderate"},
                            "Infrastructure": {"position": "Regional Infrastructure Priority", "details": "Roads, rail, telecommunications, water infrastructure, regional connectivity", "stance": "Supportive"},
                            "Regional Australia": {"position": "Regional Advocacy", "details": "Primary focus on regional development, agricultural protection, decentralization", "stance": "Champion"},
                            "Workers Rights": {"position": "Agricultural Worker Focus", "details": "Seasonal worker programs, agricultural labour solutions, small business flexibility", "stance": "Conservative"},
                            "Indigenous Affairs": {"position": "Regional Partnerships", "details": "Regional indigenous partnerships, land management cooperation, practical outcomes", "stance": "Moderate"},
                            "Technology & Innovation": {"position": "Agricultural Technology", "details": "Farm technology, rural broadband, agricultural innovation, precision agriculture", "stance": "Supportive"}
                        }
                    },
                    {
                        "name": "Australian Greens",
                        "leader": "Larissa Waters",
                        "ideology": "Green Politics/Progressivism",
                        "status": "Minor Party (1 seat House, 10 Senate)",
                        "website": "https://greens.org.au",
                        "policies": {
                            "Economy & Tax": {"position": "Wealth Redistribution", "details": "Billionaire wealth tax (10% on assets >$1B), corporate tax increase to 40%, windfall profits tax", "stance": "Progressive"},
                            "Healthcare": {"position": "Universal Healthcare Expansion", "details": "Medicare for All - free GP, dental, mental health, $14B annual investment, end out-of-pocket costs", "stance": "Progressive"},
                            "Housing": {"position": "Housing as Human Right", "details": "$10B annual public housing, end negative gearing, rent caps, speculation limits", "stance": "Progressive"},
                            "Climate & Energy": {"position": "Rapid Decarbonization", "details": "Net zero by 2035, 100% renewables by 2030, no new coal/gas, fossil fuel subsidy removal", "stance": "Progressive"},
                            "Immigration": {"position": "Humanitarian Focus", "details": "Increased refugee intake, end offshore detention, pathway to citizenship for temporary workers", "stance": "Progressive"},
                            "Education": {"position": "Free Public Education", "details": "Free university and TAFE, wipe all student debt, fully funded public schools", "stance": "Progressive"},
                            "Cost of Living": {"position": "Public Service Solutions", "details": "50c public transport, free school lunches, regulate supermarket prices, free childcare", "stance": "Progressive"},
                            "Defence & Security": {"position": "Peace & Disarmament", "details": "End AUKUS, reduce military spending, peace diplomacy focus, end weapons exports", "stance": "Progressive"},
                            "Social Services": {"position": "Universal Services", "details": "Raise welfare payments to $88/day, strengthen social services, end poverty", "stance": "Progressive"},
                            "Infrastructure": {"position": "Green Infrastructure", "details": "Public transport expansion, renewable energy grid, green buildings, nature restoration", "stance": "Progressive"},
                            "Regional Australia": {"position": "Sustainable Regional Development", "details": "End native forest logging, renewable energy jobs, sustainable agriculture support", "stance": "Supportive"},
                            "Workers Rights": {"position": "Strong Worker Protection", "details": "Wage increases, strengthen unions, 4-day work week, job security improvements", "stance": "Progressive"},
                            "Indigenous Affairs": {"position": "Truth, Treaty, Justice", "details": "Treaty negotiations, land rights expansion, indigenous sovereignty recognition", "stance": "Progressive"},
                            "Technology & Innovation": {"position": "Public Tech Investment", "details": "Public R&D investment, renewable energy tech, digital rights protection", "stance": "Progressive"}
                        }
                    },
                    {
                        "name": "One Nation",
                        "leader": "Pauline Hanson",
                        "ideology": "Right-wing Populism",
                        "status": "Minor Party (0 House, 4 Senate)",
                        "website": "https://www.onenation.org.au",
                        "policies": {
                            "Economy & Tax": {"position": "Economic Nationalism", "details": "$90B budget savings, fuel excise halved (26c/L for 3 years), protectionist trade policies", "stance": "Populist"},
                            "Healthcare": {"position": "Australian-First Healthcare", "details": "Health system for citizens first, medical cannabis support, anti-vaccine mandate stance", "stance": "Conservative"},
                            "Housing": {"position": "Housing for Australians", "details": "GST moratorium on building materials, foreign investment restrictions, citizens priority", "stance": "Populist"},
                            "Climate & Energy": {"position": "Climate Skepticism", "details": "Paris Agreement withdrawal, coal and nuclear support, climate change denial, gas development", "stance": "Conservative"},
                            "Immigration": {"position": "Strict Immigration Control", "details": "Net migration to 70,000, cultural cohesion focus, travel bans on certain countries, zero-net policy", "stance": "Conservative"},
                            "Education": {"position": "Traditional Values", "details": "Reject critical race theory, traditional curriculum, reduce arts funding, practical education", "stance": "Conservative"},
                            "Cost of Living": {"position": "Populist Cost Relief", "details": "Fuel tax cuts, cost of living measures, Australian-first policies, price control advocacy", "stance": "Populist"},
                            "Defence & Security": {"position": "Strong Border Security", "details": "Border security priority, defence investment, national security focus, law and order", "stance": "Conservative"},
                            "Social Services": {"position": "Citizens First Welfare", "details": "Aged pension increase ($100/week), NDIS reform, welfare for citizens priority", "stance": "Populist"},
                            "Infrastructure": {"position": "National Infrastructure", "details": "Australian-built infrastructure, job creation focus, national development", "stance": "Populist"},
                            "Regional Australia": {"position": "Regional Advocacy", "details": "Regional development priority, agricultural support, decentralization policies", "stance": "Supportive"},
                            "Workers Rights": {"position": "Australian Jobs First", "details": "Jobs for Australians priority, foreign worker visa restrictions, union skepticism", "stance": "Populist"},
                            "Indigenous Affairs": {"position": "One Australia Policy", "details": "Oppose separate indigenous programs, one law for all, assimilation focus", "stance": "Conservative"},
                            "Technology & Innovation": {"position": "Technology Sovereignty", "details": "Australian technology independence, foreign tech restrictions, national security focus", "stance": "Conservative"}
                        }
                    },
                    {
                        "name": "Centre Alliance",
                        "leader": "Rebekha Sharkie",
                        "ideology": "Centrism/Social Liberalism",
                        "status": "Crossbench (1 House, 0 Senate)",
                        "website": "https://centrealliance.org.au",
                        "policies": {
                            "Economy & Tax": {"position": "Pragmatic Economic Policy", "details": "Balanced approach to taxation, anti-corruption focus, transparent government spending", "stance": "Centrist"},
                            "Healthcare": {"position": "Universal Healthcare Support", "details": "Medicare strengthening, mental health support, accessible healthcare for all", "stance": "Progressive"},
                            "Housing": {"position": "Affordable Housing Solutions", "details": "Accessible housing support, first home buyer assistance, social housing investment", "stance": "Progressive"},
                            "Climate & Energy": {"position": "Practical Climate Action", "details": "Community-owned energy options, climate action support, renewable energy transition", "stance": "Moderate"},
                            "Immigration": {"position": "Humanitarian Approach", "details": "Balanced migration policy, refugee support, community integration focus", "stance": "Moderate"},
                            "Education": {"position": "Quality Public Education", "details": "Public education investment, accessible education for all, skills training support", "stance": "Progressive"},
                            "Cost of Living": {"position": "Cost of Living Relief", "details": "Targeted support for families, utility cost relief, essential services focus", "stance": "Progressive"},
                            "Defence & Security": {"position": "Balanced Security Approach", "details": "Defence capability maintenance, veteran support, regional security cooperation", "stance": "Moderate"},
                            "Social Services": {"position": "Strong Social Safety Net", "details": "NDIS improvements, social services strengthening, disability access expansion", "stance": "Progressive"},
                            "Infrastructure": {"position": "Community Infrastructure", "details": "Community-focused infrastructure, public transport, essential services", "stance": "Progressive"},
                            "Regional Australia": {"position": "Regional Development", "details": "Regional infrastructure, service delivery, economic development support", "stance": "Supportive"},
                            "Workers Rights": {"position": "Fair Work Conditions", "details": "Balanced industrial relations, worker protection, fair wages support", "stance": "Moderate"},
                            "Indigenous Affairs": {"position": "Reconciliation Support", "details": "Indigenous rights support, reconciliation process, practical outcomes focus", "stance": "Progressive"},
                            "Technology & Innovation": {"position": "Digital Innovation", "details": "Technology advancement, digital services, innovation support", "stance": "Progressive"}
                        }
                    },
                    {
                        "name": "Katter's Australian Party",
                        "leader": "Robbie Katter",
                        "ideology": "Agrarian Populism",
                        "status": "Crossbench (1 House, 0 Senate)",
                        "website": "https://kattersaustralianparty.org.au",
                        "policies": {
                            "Economy & Tax": {"position": "Developmentalist Economics", "details": "Government development bank, nationalization of key services, protectionist policies", "stance": "Populist"},
                            "Healthcare": {"position": "Regional Healthcare Priority", "details": "Rural healthcare access, government health services, regional medical support", "stance": "Progressive"},
                            "Housing": {"position": "Government Housing Solutions", "details": "Public housing investment, regional housing development, government-led construction", "stance": "Progressive"},
                            "Climate & Energy": {"position": "Practical Energy Policy", "details": "Hydro development, solar support, oppose carbon tax, alternative energy development", "stance": "Moderate"},
                            "Immigration": {"position": "Controlled Immigration", "details": "Regional migration focus, agricultural worker programs, controlled intake", "stance": "Conservative"},
                            "Education": {"position": "Practical Education", "details": "TAFE system reform, vocational training, trade skills development", "stance": "Moderate"},
                            "Cost of Living": {"position": "Anti-Corporate Populism", "details": "Supermarket monopoly opposition, price control advocacy, cost reduction focus", "stance": "Populist"},
                            "Defence & Security": {"position": "National Defence", "details": "Strong defence capability, regional security, veteran support", "stance": "Conservative"},
                            "Social Services": {"position": "Government Service Provision", "details": "Public service delivery, social support systems, government responsibility", "stance": "Progressive"},
                            "Infrastructure": {"position": "Government Infrastructure", "details": "Public infrastructure investment, dams, roads, rail, government ownership", "stance": "Progressive"},
                            "Regional Australia": {"position": "Regional Advocacy Champion", "details": "North Queensland statehood, regional development, decentralization priority", "stance": "Champion"},
                            "Workers Rights": {"position": "Worker Protection", "details": "Fair wages, worker rights, regional employment focus, job security", "stance": "Progressive"},
                            "Indigenous Affairs": {"position": "Regional Indigenous Partnerships", "details": "Regional indigenous cooperation, land management partnerships, practical reconciliation", "stance": "Moderate"},
                            "Technology & Innovation": {"position": "Regional Technology Development", "details": "Regional broadband, agricultural technology, practical innovation focus", "stance": "Moderate"}
                        }
                    },
                    {
                        "name": "United Australia Party",
                        "leader": "Ralph Babet",
                        "ideology": "Australian Nationalism",
                        "status": "Crossbench (0 House, 1 Senate)",
                        "website": "https://www.unitedaustraliaparty.org.au",
                        "policies": {
                            "Economy & Tax": {"position": "Economic Stimulus", "details": "3% maximum home loan rates, $30k tax deductible mortgage payments, debt repayment focus", "stance": "Populist"},
                            "Healthcare": {"position": "Healthcare Investment", "details": "$40B additional healthcare funding, hospital direct funding, aged care priority", "stance": "Progressive"},
                            "Housing": {"position": "Home Ownership Support", "details": "3% maximum interest rates, mortgage tax deductibility, Australian home ownership priority", "stance": "Populist"},
                            "Climate & Energy": {"position": "Energy Security", "details": "Energy independence focus, practical energy solutions, Australian energy priority", "stance": "Moderate"},
                            "Immigration": {"position": "Controlled Migration", "details": "Skilled migration focus, Australian jobs priority, border security emphasis", "stance": "Conservative"},
                            "Education": {"position": "Education Investment", "details": "Abolish HECS debts, $20B education investment, job-focused education", "stance": "Progressive"},
                            "Cost of Living": {"position": "Direct Cost Relief", "details": "Interest rate caps, tax relief on second jobs, FBT abolition, regional tax concessions", "stance": "Populist"},
                            "Defence & Security": {"position": "Strong Defence", "details": "Defence investment priority, US alliance, submarine capability, national security", "stance": "Conservative"},
                            "Social Services": {"position": "Pension & Welfare Support", "details": "Age pension increase ($180 fortnight), welfare system strengthening", "stance": "Progressive"},
                            "Infrastructure": {"position": "National Infrastructure", "details": "Infrastructure investment, hospital construction, national development", "stance": "Progressive"},
                            "Regional Australia": {"position": "Regional Development", "details": "20% tax concession >200km from cities, decentralization incentives, regional support", "stance": "Supportive"},
                            "Workers Rights": {"position": "Employment Focus", "details": "Job creation priority, second job tax relief, employment opportunities", "stance": "Moderate"},
                            "Indigenous Affairs": {"position": "Inclusive Approach", "details": "Inclusive policies, practical outcomes, national unity focus", "stance": "Moderate"},
                            "Technology & Innovation": {"position": "Innovation Investment", "details": "Technology development, innovation support, national capability building", "stance": "Progressive"}
                        }
                    },
                    {
                        "name": "Jacqui Lambie Network",
                        "leader": "Jacqui Lambie",
                        "ideology": "Populism/Social Conservatism",
                        "status": "Crossbench (0 House, 1 Senate)",
                        "website": "https://lambienetwork.com.au",
                        "policies": {
                            "Economy & Tax": {"position": "Working Class Focus", "details": "Financial transactions tax, negative gearing consultation, GST opposition, battler support", "stance": "Populist"},
                            "Healthcare": {"position": "Universal Healthcare", "details": "Medicare strengthening, veteran healthcare priority, Gold Card for war veterans", "stance": "Progressive"},
                            "Housing": {"position": "Housing Affordability", "details": "Social housing support, first home buyer assistance, housing crisis action", "stance": "Progressive"},
                            "Climate & Energy": {"position": "Energy Affordability", "details": "Energy cost relief, practical climate action, renewable energy support with cost focus", "stance": "Moderate"},
                            "Immigration": {"position": "Balanced Migration", "details": "Humanitarian focus, refugee support, balanced migration approach", "stance": "Moderate"},
                            "Education": {"position": "Accessible Education", "details": "TAFE reform, veteran education support (Digger's Act), vocational training priority", "stance": "Progressive"},
                            "Cost of Living": {"position": "Cost Relief Priority", "details": "Cost of living measures, energy bill support, working family relief", "stance": "Progressive"},
                            "Defence & Security": {"position": "Veteran Advocacy", "details": "Veterans Royal Commission, Defence abuse inquiry, veteran welfare priority", "stance": "Progressive"},
                            "Social Services": {"position": "Social Safety Net", "details": "NDIS improvements, aged pension support, pension indexation, welfare strengthening", "stance": "Progressive"},
                            "Infrastructure": {"position": "Essential Infrastructure", "details": "Infrastructure investment, essential services, community infrastructure", "stance": "Progressive"},
                            "Regional Australia": {"position": "Regional Advocacy", "details": "Regional development, agricultural land protection, regional service delivery", "stance": "Supportive"},
                            "Workers Rights": {"position": "Worker Protection", "details": "Fair work conditions, industrial relations balance, worker rights protection", "stance": "Progressive"},
                            "Indigenous Affairs": {"position": "Practical Reconciliation", "details": "Practical outcomes focus, community-based solutions, indigenous support", "stance": "Moderate"},
                            "Technology & Innovation": {"position": "Digital Inclusion", "details": "Digital access, technology benefits for all, innovation support", "stance": "Progressive"}
                        }
                    },
                    {
                        "name": "David Pocock",
                        "leader": "David Pocock",
                        "ideology": "Progressive Independent",
                        "status": "Independent (0 House, 1 Senate)",
                        "website": "https://www.davidpocock.com.au",
                        "policies": {
                            "Economy & Tax": {"position": "Progressive Tax Reform", "details": "Corporate tax transparency, wealth inequality reduction, progressive taxation support", "stance": "Progressive"},
                            "Healthcare": {"position": "Universal Healthcare", "details": "Medicare expansion, aged care reform, mental health investment, accessible healthcare", "stance": "Progressive"},
                            "Housing": {"position": "Housing Affordability", "details": "Social housing investment, first home buyer support, rental protections", "stance": "Progressive"},
                            "Climate & Energy": {"position": "Climate Action Priority", "details": "Rapid decarbonization, renewable energy transition, climate emergency response", "stance": "Progressive"},
                            "Immigration": {"position": "Humanitarian Focus", "details": "Refugee protection, humanitarian migration, inclusive policies", "stance": "Progressive"},
                            "Education": {"position": "Education Investment", "details": "Public education funding, accessibility focus, skill development", "stance": "Progressive"},
                            "Cost of Living": {"position": "Cost Relief Measures", "details": "Energy efficiency support, cost reduction initiatives, working family support", "stance": "Progressive"},
                            "Defence & Security": {"position": "Peace & Security Balance", "details": "Measured defence approach, peace diplomacy, security without militarization", "stance": "Moderate"},
                            "Social Services": {"position": "Social Justice", "details": "Welfare adequacy, JobSeeker increases, Economic Inclusion Committee support", "stance": "Progressive"},
                            "Infrastructure": {"position": "Sustainable Infrastructure", "details": "Green infrastructure, public transport, sustainable development", "stance": "Progressive"},
                            "Regional Australia": {"position": "Regional Support", "details": "Regional development, service delivery, economic opportunities", "stance": "Supportive"},
                            "Workers Rights": {"position": "Worker Protection with Business Balance", "details": "Fair work conditions, worker rights, balanced industrial relations", "stance": "Moderate"},
                            "Indigenous Affairs": {"position": "Indigenous Rights", "details": "Indigenous recognition, rights protection, cultural preservation", "stance": "Progressive"},
                            "Technology & Innovation": {"position": "Digital Rights & Innovation", "details": "Digital rights protection, innovation investment, accessibility focus", "stance": "Progressive"}
                        }
                    }
                ],
                "public_opinion": {
                    "Economy & Tax": {"progressive": 35, "moderate": 40, "conservative": 25, "source": "Roy Morgan 2025 - Cost of living concerns (57%) drive mixed attitudes", "notes": "Australians prioritize cost of living relief but are divided on taxation approaches"},
                    "Healthcare": {"progressive": 52, "moderate": 32, "conservative": 16, "source": "Australian Health Consumer Sentiment Survey 2021 - 84% satisfied with current services", "notes": "Strong support for public healthcare, but concerns about workforce and costs"},
                    "Housing": {"progressive": 48, "moderate": 35, "conservative": 17, "source": "University of Sydney 2025 - Housing crisis impacts most sectors of society", "notes": "Housing crisis creates broad support for government action across political spectrum"},
                    "Climate & Energy": {"progressive": 43, "moderate": 37, "conservative": 20, "source": "Lowy Institute Poll 2025 - 51% say urgent action needed, 33% gradual approach", "notes": "Climate concern declining slightly but majority still want action"},
                    "Immigration": {"progressive": 28, "moderate": 40, "conservative": 32, "source": "Lowy Institute 2024 & Roy Morgan 2025 - 48% think intake too high, but 90% support multiculturalism", "notes": "Contradictory views: support diversity but want lower immigration numbers"},
                    "Education": {"progressive": 42, "moderate": 38, "conservative": 20, "source": "Roy Morgan 2025 - Education ranks 10th in voter priorities at 14%", "notes": "Education not a top priority but broad support for public education investment"},
                    "Cost of Living": {"progressive": 45, "moderate": 35, "conservative": 20, "source": "Roy Morgan 2025 - 57% cite keeping costs down as most important issue", "notes": "Top voter concern driving support for government intervention"},
                    "Defence & Security": {"progressive": 20, "moderate": 45, "conservative": 35, "source": "Lowy Institute Poll 2025 - Mixed views on AUKUS and regional security", "notes": "Bipartisan support for strong defence but debate over approach"},
                    "Social Services": {"progressive": 46, "moderate": 35, "conservative": 19, "source": "Australian Health Consumer Sentiment Survey 2021 - Strong support for disability and aged care", "notes": "Broad support for social safety net, concerns about sustainability"},
                    "Infrastructure": {"progressive": 38, "moderate": 45, "conservative": 17, "source": "Roy Morgan 2025 - Infrastructure linked to regional development priorities", "notes": "Broad bipartisan support for infrastructure investment"},
                    "Regional Australia": {"progressive": 32, "moderate": 42, "conservative": 26, "source": "Roy Morgan 2025 - Regional concerns about services and infrastructure", "notes": "Strong cross-party support for regional development with different priorities"},
                    "Workers Rights": {"progressive": 41, "moderate": 38, "conservative": 21, "source": "Roy Morgan 2025 - Worker concerns embedded in cost of living issues", "notes": "Support for worker protection amid cost of living pressures"},
                    "Indigenous Affairs": {"progressive": 38, "moderate": 40, "conservative": 22, "source": "Post-Voice referendum polling 2023-2024 - Divided but majority support reconciliation", "notes": "Voice referendum defeat but continued support for reconciliation measures"},
                    "Technology & Innovation": {"progressive": 35, "moderate": 50, "conservative": 15, "source": "Various polls 2024-2025 - Technology generally seen as positive", "notes": "Broad support for innovation with concerns about privacy and regulation"}
                },
                "metadata": {
                    "last_updated": "2025-10-03",
                    "election_year": "2025",
                    "total_parties": 10,
                    "total_policy_areas": 14,
                    "data_source": "Australian Electoral Commission, Party Websites, Parliamentary Records",
                    "opinion_data_sources": ["Roy Morgan polling 2024-2025", "Lowy Institute Poll 2024-2025", "Australian Health Consumer Sentiment Survey 2021", "Ipsos Issues Monitor 2025", "Essential Research polling 2025", "University research and academic studies"],
                    "features": ["Political party policy positions", "Public opinion breakdowns (Progressive/Moderate/Conservative)", "Interactive policy comparison", "Search and filtering capabilities", "Source citations and methodology"]
                }
            };
            
            console.log('Data loaded successfully:', this.data.parties.length, 'parties loaded');
            console.log('All parties:', this.data.parties.map(p => p.name));
        } catch (error) {
            console.error('Data loading error:', error);
            throw error;
        }
    }

    setupEventListeners() {
        // Navigation tabs
        document.getElementById('policy-tab').addEventListener('click', () => {
            this.switchView('policy');
        });
        
        document.getElementById('opinion-tab').addEventListener('click', () => {
            this.switchView('opinion');
        });

        // Policy controls
        document.getElementById('policy-select').addEventListener('change', (e) => {
            this.handlePolicyChange(e.target.value);
        });

        document.getElementById('party-search').addEventListener('input', () => {
            this.applyFilter();
        });

        document.getElementById('alignment-filter').addEventListener('change', () => {
            this.applyFilter();
        });

        document.getElementById('view-toggle').addEventListener('change', (e) => {
            this.showOpinionData = e.target.value === 'with-opinion';
            if (this.currentPolicy) {
                this.applyFilter();
                this.updateOpinionSummary();
            }
        });

        // Modal controls
        document.getElementById('close-modal').addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('comparison-modal').addEventListener('click', (e) => {
            if (e.target.id === 'comparison-modal') {
                this.closeModal();
            }
        });
    }

    switchView(viewType) {
        this.currentView = viewType;
        
        // Update tab states
        document.querySelectorAll('.nav-tab').forEach(tab => tab.classList.remove('active'));
        document.getElementById(`${viewType}-tab`).classList.add('active');
        
        // Switch views
        document.getElementById('policy-view').classList.toggle('hidden', viewType !== 'policy');
        document.getElementById('opinion-view').classList.toggle('hidden', viewType !== 'opinion');
        
        if (viewType === 'opinion') {
            this.renderPublicOpinionOverview();
        }
    }

    populatePolicySelector() {
        const selector = document.getElementById('policy-select');
        // Clear existing options except the first one
        while (selector.children.length > 1) {
            selector.removeChild(selector.lastChild);
        }
        
        this.data.policy_areas.forEach(area => {
            const option = document.createElement('option');
            option.value = area;
            option.textContent = area;
            selector.appendChild(option);
        });
    }

    handlePolicyChange(policyArea) {
        this.currentPolicy = policyArea;
        
        if (!policyArea) {
            this.showInfoPanel();
            return;
        }
        
        console.log(`Policy changed to: ${policyArea}`);
        this.hideInfoPanel();
        this.updateResultsHeader(policyArea);
        this.updateOpinionSummary();
        this.applyFilter();
    }

    updateOpinionSummary() {
        const summaryDiv = document.getElementById('opinion-summary');
        
        if (!this.currentPolicy || !this.showOpinionData) {
            summaryDiv.classList.add('hidden');
            return;
        }

        const opinionData = this.data.public_opinion[this.currentPolicy];
        if (!opinionData) {
            summaryDiv.classList.add('hidden');
            return;
        }

        summaryDiv.classList.remove('hidden');
        
        // Update title and source
        document.getElementById('opinion-title').textContent = `Public Opinion: ${this.currentPolicy}`;
        document.getElementById('opinion-source').textContent = `Source: ${opinionData.source}`;
        
        // Update percentages
        document.getElementById('progressive-percent').textContent = `${opinionData.progressive}%`;
        document.getElementById('moderate-percent').textContent = `${opinionData.moderate}%`;
        document.getElementById('conservative-percent').textContent = `${opinionData.conservative}%`;
        
        // Update notes
        document.getElementById('opinion-notes').textContent = opinionData.notes;
        
        // Create pie chart
        this.createOpinionChart(opinionData);
    }

    createOpinionChart(opinionData) {
        const ctx = document.getElementById('opinion-chart');
        
        if (this.charts.opinion) {
            this.charts.opinion.destroy();
        }
        
        this.charts.opinion = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Progressive', 'Moderate', 'Conservative'],
                datasets: [{
                    data: [opinionData.progressive, opinionData.moderate, opinionData.conservative],
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C'],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    }
                }
            }
        });
    }

    calculateAlignment(partyStance, opinionData) {
        const majority = Math.max(opinionData.progressive, opinionData.moderate, opinionData.conservative);
        let majorityType = 'moderate';
        
        if (opinionData.progressive === majority) majorityType = 'progressive';
        else if (opinionData.conservative === majority) majorityType = 'conservative';
        
        const stanceLower = partyStance.toLowerCase();
        
        // Direct alignment check
        if (stanceLower.includes('progressive') && majorityType === 'progressive') return 'aligned';
        if (stanceLower.includes('conservative') && majorityType === 'conservative') return 'aligned';
        if ((stanceLower.includes('moderate') || stanceLower.includes('centrist')) && majorityType === 'moderate') return 'aligned';
        
        // Partial alignment
        if (majority - Math.min(opinionData.progressive, opinionData.moderate, opinionData.conservative) < 15) {
            return 'moderate-alignment';
        }
        
        return 'misaligned';
    }

    applyFilter() {
        if (!this.currentPolicy) return;
        
        console.log(`Applying filter for policy: ${this.currentPolicy}`);
        
        // Start with all parties that have the current policy
        let parties = this.data.parties.filter(party => {
            const hasPolicy = party.policies && party.policies[this.currentPolicy];
            console.log(`Party ${party.name}: has policy = ${hasPolicy}`);
            return hasPolicy;
        });

        console.log(`Parties with ${this.currentPolicy} policy:`, parties.length, parties.map(p => p.name));

        // Apply search filter
        const search = document.getElementById('party-search').value.trim().toLowerCase();
        if (search) {
            parties = parties.filter(party =>
                party.name.toLowerCase().includes(search) ||
                party.leader.toLowerCase().includes(search)
            );
            console.log(`After search filter (${search}):`, parties.length, 'parties');
        }

        // Apply alignment filter
        const alignmentFilter = document.getElementById('alignment-filter').value;
        if (alignmentFilter && this.data.public_opinion[this.currentPolicy]) {
            const opinionData = this.data.public_opinion[this.currentPolicy];
            parties = parties.filter(party => {
                const alignment = this.calculateAlignment(party.policies[this.currentPolicy].stance, opinionData);
                return alignment === alignmentFilter;
            });
            console.log(`After alignment filter (${alignmentFilter}):`, parties.length, 'parties');
        }

        console.log('Final parties to render:', parties.map(p => p.name));
        this.renderParties(parties);
        this.updateResultsCount(parties.length);
    }

    renderParties(parties) {
        const grid = document.getElementById('parties-grid');
        const noResults = document.getElementById('no-results');

        console.log(`Rendering ${parties.length} parties`);

        if (!parties || parties.length === 0) {
            grid.innerHTML = '';
            noResults.classList.remove('hidden');
            return;
        }

        noResults.classList.add('hidden');
        grid.innerHTML = parties.map(party => this.createPartyCard(party)).join('');
        this.attachPartyCardListeners();
    }

    createPartyCard(party) {
        const policy = party.policies[this.currentPolicy];
        const stanceClass = policy.stance.toLowerCase().replace(/[^a-z]/g, '-');
        
        let alignmentHTML = '';
        let cardClass = 'party-card';
        
        if (this.showOpinionData && this.data.public_opinion[this.currentPolicy]) {
            const opinionData = this.data.public_opinion[this.currentPolicy];
            const alignment = this.calculateAlignment(policy.stance, opinionData);
            
            cardClass += ` ${alignment}`;
            
            const alignmentText = {
                'aligned': 'Aligned with majority opinion',
                'moderate-alignment': 'Partially aligned with public opinion',
                'misaligned': 'Against majority opinion'
            };
            
            alignmentHTML = `
                <div class="alignment-indicator">
                    <div class="alignment-icon ${alignment}"></div>
                    <span class="alignment-text">${alignmentText[alignment]}</span>
                </div>
            `;
        }

        return `
            <div class="${cardClass}" data-party="${party.name}">
                <div class="party-header">
                    <div>
                        <h3 class="party-name">${party.name}</h3>
                        <p class="party-leader">Leader: ${party.leader}</p>
                    </div>
                    <div class="party-status">${party.status}</div>
                </div>
                <div class="party-ideology">${party.ideology}</div>
                ${alignmentHTML}
                <div class="stance-badge stance-${stanceClass}">${policy.stance}</div>
                <div class="policy-position">
                    <h4 class="position-title">${policy.position}</h4>
                    <p class="position-details">${policy.details}</p>
                </div>
                <div class="party-actions">
                    <a href="${party.website}" target="_blank" class="party-website">Visit Website →</a>
                    <button class="compare-btn" data-party="${party.name}">Add to Compare</button>
                </div>
            </div>
        `;
    }

    attachPartyCardListeners() {
        document.querySelectorAll('.compare-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const partyName = e.target.dataset.party;
                this.toggleCompareSelection(partyName, e.target);
            });
        });
    }

    toggleCompareSelection(partyName, button) {
        const index = this.selectedForComparison.indexOf(partyName);
        
        if (index > -1) {
            this.selectedForComparison.splice(index, 1);
            button.textContent = 'Add to Compare';
            button.classList.remove('selected');
        } else {
            if (this.selectedForComparison.length >= 3) {
                alert('You can compare up to 3 parties at once.');
                return;
            }
            this.selectedForComparison.push(partyName);
            button.textContent = 'Added ✓';
            button.classList.add('selected');
        }

        if (this.selectedForComparison.length >= 2) {
            this.showComparison();
        }
    }

    showComparison() {
        const modal = document.getElementById('comparison-modal');
        const content = document.getElementById('comparison-content');
        
        content.innerHTML = this.createComparisonHTML();
        modal.classList.remove('hidden');
    }

    createComparisonHTML() {
        if (!this.currentPolicy) {
            return '<p>Select a policy area to compare parties.</p>';
        }

        const parties = this.selectedForComparison
            .map(name => this.data.parties.find(p => p.name === name))
            .filter(Boolean);

        let opinionContextHTML = '';
        if (this.showOpinionData && this.data.public_opinion[this.currentPolicy]) {
            const opinionData = this.data.public_opinion[this.currentPolicy];
            opinionContextHTML = `
                <div class="comparison-opinion-context">
                    <h4>Public Opinion Context</h4>
                    <p><strong>Progressive:</strong> ${opinionData.progressive}% | 
                       <strong>Moderate:</strong> ${opinionData.moderate}% | 
                       <strong>Conservative:</strong> ${opinionData.conservative}%</p>
                    <p class="opinion-source">${opinionData.source}</p>
                </div>
            `;
        }

        return `
            <div class="comparison-header">
                <h4>Comparing positions on: ${this.currentPolicy}</h4>
                <p>${parties.length} parties selected</p>
            </div>
            ${opinionContextHTML}
            <div class="comparison-grid">
                ${parties.map(party => this.createComparisonCard(party)).join('')}
            </div>
            <div class="comparison-actions">
                <button class="btn btn--secondary" onclick="dashboard.clearComparison()">Clear Selection</button>
            </div>
        `;
    }

    createComparisonCard(party) {
        const policy = party.policies[this.currentPolicy];
        const stanceClass = policy.stance.toLowerCase().replace(/[^a-z]/g, '-');
        
        let alignmentHTML = '';
        if (this.showOpinionData && this.data.public_opinion[this.currentPolicy]) {
            const opinionData = this.data.public_opinion[this.currentPolicy];
            const alignment = this.calculateAlignment(policy.stance, opinionData);
            
            const alignmentText = {
                'aligned': '✓ Aligned',
                'moderate-alignment': '~ Partial',
                'misaligned': '✗ Misaligned'
            };
            
            alignmentHTML = `<div class="alignment-badge ${alignment}">${alignmentText[alignment]}</div>`;
        }

        return `
            <div class="comparison-card">
                <div class="comparison-party-header">
                    <h5>${party.name}</h5>
                    <span class="stance-badge stance-${stanceClass}">${policy.stance}</span>
                    ${alignmentHTML}
                </div>
                <div class="comparison-position">
                    <strong>${policy.position}</strong>
                    <p>${policy.details}</p>
                </div>
                <div class="comparison-meta">
                    <small>Leader: ${party.leader} | ${party.ideology}</small>
                </div>
            </div>
        `;
    }

    renderPublicOpinionOverview() {
        this.createOverviewChart();
        this.createConsensusAnalysis();
        this.createPartyAlignmentChart();
        this.populateDataSources();
    }

    createOverviewChart() {
        const ctx = document.getElementById('overview-chart');
        
        if (this.charts.overview) {
            this.charts.overview.destroy();
        }

        const policyAreas = this.data.policy_areas.filter(area => this.data.public_opinion[area]);
        const progressiveData = policyAreas.map(area => this.data.public_opinion[area].progressive);
        const moderateData = policyAreas.map(area => this.data.public_opinion[area].moderate);
        const conservativeData = policyAreas.map(area => this.data.public_opinion[area].conservative);

        this.charts.overview = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: policyAreas,
                datasets: [
                    {
                        label: 'Progressive',
                        data: progressiveData,
                        backgroundColor: '#1FB8CD'
                    },
                    {
                        label: 'Moderate', 
                        data: moderateData,
                        backgroundColor: '#FFC185'
                    },
                    {
                        label: 'Conservative',
                        data: conservativeData,
                        backgroundColor: '#B4413C'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        stacked: true
                    },
                    y: {
                        stacked: true,
                        max: 100
                    }
                },
                plugins: {
                    legend: {
                        position: 'top'
                    }
                }
            }
        });
    }

    createConsensusAnalysis() {
        const consensusList = document.getElementById('consensus-list');
        const policyAreas = this.data.policy_areas.filter(area => this.data.public_opinion[area]);
        
        const consensusData = policyAreas.map(area => {
            const opinion = this.data.public_opinion[area];
            const max = Math.max(opinion.progressive, opinion.moderate, opinion.conservative);
            const min = Math.min(opinion.progressive, opinion.moderate, opinion.conservative);
            const consensus = max - min;
            
            let level = 'High Consensus';
            let levelClass = 'consensus-high';
            if (consensus < 20) {
                level = 'Low Consensus';
                levelClass = 'consensus-low';
            } else if (consensus < 35) {
                level = 'Moderate Consensus';
                levelClass = 'consensus-moderate';
            }
            
            return { area, consensus, level, levelClass };
        });
        
        consensusData.sort((a, b) => b.consensus - a.consensus);
        
        consensusList.innerHTML = consensusData.map(item => `
            <div class="consensus-item">
                <span class="consensus-item-name">${item.area}</span>
                <span class="consensus-item-score ${item.levelClass}">${item.level}</span>
            </div>
        `).join('');
    }

    createPartyAlignmentChart() {
        const ctx = document.getElementById('alignment-chart');
        
        if (this.charts.alignment) {
            this.charts.alignment.destroy();
        }

        const partyAlignmentData = this.data.parties.map(party => {
            let alignedCount = 0;
            let totalPolicies = 0;
            
            this.data.policy_areas.forEach(area => {
                if (party.policies[area] && this.data.public_opinion[area]) {
                    totalPolicies++;
                    const alignment = this.calculateAlignment(party.policies[area].stance, this.data.public_opinion[area]);
                    if (alignment === 'aligned') alignedCount++;
                }
            });
            
            return {
                party: party.name,
                alignmentScore: totalPolicies > 0 ? Math.round((alignedCount / totalPolicies) * 100) : 0
            };
        });

        partyAlignmentData.sort((a, b) => b.alignmentScore - a.alignmentScore);

        this.charts.alignment = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: partyAlignmentData.map(item => item.party),
                datasets: [{
                    label: 'Public Opinion Alignment Score (%)',
                    data: partyAlignmentData.map(item => item.alignmentScore),
                    backgroundColor: '#1FB8CD',
                    borderColor: '#ECEBD5',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 100
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    populateDataSources() {
        const sourcesList = document.getElementById('data-sources');
        if (!this.data.metadata || !this.data.metadata.opinion_data_sources) return;
        
        sourcesList.innerHTML = this.data.metadata.opinion_data_sources.map(source => `
            <li>${source}</li>
        `).join('');
    }

    clearComparison() {
        this.selectedForComparison = [];
        this.closeModal();
        document.querySelectorAll('.compare-btn').forEach(btn => {
            btn.textContent = 'Add to Compare';
            btn.classList.remove('selected');
        });
    }

    closeModal() {
        document.getElementById('comparison-modal').classList.add('hidden');
    }

    updateResultsHeader(policyArea) {
        document.getElementById('results-header').classList.remove('hidden');
        document.getElementById('current-policy-title').textContent = `${policyArea} - Party Positions`;
    }

    updateResultsCount(count) {
        document.getElementById('results-count').textContent = `Showing ${count} ${count === 1 ? 'party' : 'parties'}`;
    }

    showInfoPanel() {
        document.getElementById('info-panel').classList.remove('hidden');
        document.getElementById('opinion-summary').classList.add('hidden');
        document.getElementById('results-header').classList.add('hidden');
        document.getElementById('parties-grid').innerHTML = '';
        document.getElementById('no-results').classList.add('hidden');
        this.updateStatistics();
    }

    hideInfoPanel() {
        document.getElementById('info-panel').classList.add('hidden');
    }

    updateStatistics() {
        const statsSection = document.querySelector('.stats');
        if (!statsSection || !this.data) return;
        
        statsSection.innerHTML = `
            <span class="stat-item"><strong>${this.data.parties.length}</strong> Political Parties</span>
            <span class="stat-item"><strong>${this.data.policy_areas.length}</strong> Policy Areas</span>
            <span class="stat-item"><strong>Public Opinion</strong> Data Included</span>
            <span class="stat-item">Last Updated: <strong>October 2025</strong></span>
        `;
    }

    showLoading() {
        document.getElementById('parties-grid').innerHTML = `
            <div class="loading">
                <p>Loading enhanced political party data with public opinion...</p>
            </div>
        `;
    }

    showError(message) {
        document.getElementById('parties-grid').innerHTML = `
            <div class="error-message card">
                <div class="card__body">
                    <h3>Error</h3>
                    <p>${message}</p>
                </div>
            </div>
        `;
    }

    setupCharts() {
        // Configure Chart.js defaults
        Chart.defaults.font.family = 'var(--font-family-base)';
        Chart.defaults.color = '#626C7C';
    }
}

// Initialize the enhanced dashboard
window.dashboard = new EnhancedPoliticalDashboard();