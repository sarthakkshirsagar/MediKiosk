/** Indian states/UTs offered at the kiosk, with dependent city lists. */
export interface Region {
  code: string;
  name: string;
}

export const STATES: Region[] = [
  { code: 'mp', name: 'Madhya Pradesh' },
  { code: 'mh', name: 'Maharashtra' },
  { code: 'up', name: 'Uttar Pradesh' },
  { code: 'rj', name: 'Rajasthan' },
  { code: 'br', name: 'Bihar' },
  { code: 'cg', name: 'Chhattisgarh' },
  { code: 'gj', name: 'Gujarat' },
  { code: 'dl', name: 'Delhi' },
  { code: 'ka', name: 'Karnataka' },
  { code: 'tn', name: 'Tamil Nadu' },
];

export const CITIES_BY_STATE: Record<string, Region[]> = {
  mp: [
    { code: 'indore', name: 'Indore' },
    { code: 'bhopal', name: 'Bhopal' },
    { code: 'jabalpur', name: 'Jabalpur' },
    { code: 'gwalior', name: 'Gwalior' },
    { code: 'ujjain', name: 'Ujjain' },
    { code: 'sagar', name: 'Sagar' },
  ],
  mh: [
    { code: 'mumbai', name: 'Mumbai' },
    { code: 'nagpur', name: 'Nagpur' },
    { code: 'pune', name: 'Pune' },
    { code: 'indore-na', name: 'Nashik' },
    { code: 'aurangabad', name: 'Chh. Sambhajinagar' },
  ],
  up: [
    { code: 'lucknow', name: 'Lucknow' },
    { code: 'kanpur', name: 'Kanpur' },
    { code: 'varanasi', name: 'Varanasi' },
    { code: 'agra', name: 'Agra' },
    { code: 'prayagraj', name: 'Prayagraj' },
  ],
  rj: [
    { code: 'jaipur', name: 'Jaipur' },
    { code: 'jodhpur', name: 'Jodhpur' },
    { code: 'kota', name: 'Kota' },
    { code: 'udaipur', name: 'Udaipur' },
    { code: 'ajmer', name: 'Ajmer' },
  ],
  br: [
    { code: 'patna', name: 'Patna' },
    { code: 'gaya', name: 'Gaya' },
    { code: 'bhagalpur', name: 'Bhagalpur' },
    { code: 'muzaffarpur', name: 'Muzaffarpur' },
    { code: 'darbhanga', name: 'Darbhanga' },
  ],
  cg: [
    { code: 'raipur', name: 'Raipur' },
    { code: 'bhilai', name: 'Bhilai' },
    { code: 'bilaspur', name: 'Bilaspur' },
    { code: 'korba', name: 'Korba' },
    { code: 'durg', name: 'Durg' },
  ],
  gj: [
    { code: 'ahmedabad', name: 'Ahmedabad' },
    { code: 'surat', name: 'Surat' },
    { code: 'vadodara', name: 'Vadodara' },
    { code: 'rajkot', name: 'Rajkot' },
    { code: 'bhavnagar', name: 'Bhavnagar' },
  ],
  dl: [
    { code: 'new-delhi', name: 'New Delhi' },
    { code: 'delhi-ncr', name: 'Delhi NCR' },
  ],
  ka: [
    { code: 'bengaluru', name: 'Bengaluru' },
    { code: 'mysuru', name: 'Mysuru' },
    { code: 'hubballi', name: 'Hubballi' },
    { code: 'mangaluru', name: 'Mangaluru' },
    { code: 'belagavi', name: 'Belagavi' },
  ],
  tn: [
    { code: 'chennai', name: 'Chennai' },
    { code: 'coimbatore', name: 'Coimbatore' },
    { code: 'madurai', name: 'Madurai' },
    { code: 'trichy', name: 'Tiruchirappalli' },
    { code: 'salem', name: 'Salem' },
  ],
};

export function citiesForState(stateCode: string | null): Region[] {
  return (stateCode && CITIES_BY_STATE[stateCode]) || [];
}
