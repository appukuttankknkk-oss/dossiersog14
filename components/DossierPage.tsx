
import React from 'react';
import { DossierState, FAMILY_KEYS, DIGITAL_KEYS, DOC_KEYS, HABIT_KEYS } from '../types';

interface DossierPageProps {
  state: DossierState;
}

export const DossierPage: React.FC<DossierPageProps> = ({ state }) => {
  const { fields, photos, extraPhotos, videos, audio, reportType, bailHistory } = state;

  const getLabel = (n: number) => {
    const labels: Record<number, string> = {
      1: 'नाम/उपनाम (Name/Alias)',
      2: 'पिता का नाम (Father\'s Name)',
      3: 'जन्म तिथि/स्थान (DOB/Place)',
      4: 'लिंग (Gender)',
      5: 'पहचान चिन्ह (Identity Mark)',
      6: 'धर्म / जाति (Religion / Caste)',
      7: 'स्थायी पता (Permanent Address)',
      8: 'वर्तमान पता (Current Address)',
      9: 'शैक्षणिक योग्यता (Educational Qual)',
      10: 'भाषा (Language Proficiency)',
      11: 'मोबाईल नम्बर/आई.एम.ई. (Mobile/IMEI)',
      12: 'पारिवारिक विवरणी (Family Details)',
      14: 'आदतें (Habits)',
      15: 'वैवाहिक स्थिति (Marital Status)',
      16: 'अन्य महत्वपूर्ण संबंधी (Other Relations)',
      18: 'आर्थिक स्थिति (Economic Status)',
      19: 'सम्पति विवरणी (Asset Details)',
      20: 'वाहन विवरण (Vehicle Details)',
      21: 'समाजिक प्रभाव (Social Influence)',
      22: 'अपराध शैली (Modus Operandi)',
      23: 'अपराध क्षेत्र (Area of Operation)',
      24: 'अपराधिक इतिहास (Criminal History)',
      25: 'सहयोगी विवरण (Associate Details)',
      26: 'छिपने का स्थान (Hideouts)',
      27: 'संरक्षणदाता (Protectors/Sponsors)',
      28: 'आर्थिक सहयोगी (Financial Supporters)',
      29: 'पूर्व गिरफ़्तारी की विवरणी (Criminal history)',
      30: 'वर्तमान गिरफ़्तारी की विवरणी (Details of arrest)',
      31: 'गिरोह का सदस्य (Gang members)',
      32: 'गैंग के सदस्यों का आगामी आपराधिक योजना (Future planning of gang)',
      33: 'गैंग के पास किस प्रकार का हथियार है (Types of weapon gang have)',
      34: 'तकनिकी ज्ञान (Digital Details)',
      35: 'दस्तावेज (Docs)',
      36: 'जेल विवरणी (Jail Details)',
      37: 'अन्य महत्वपूर्ण जानकारी',
      38: 'INTERROGATION REPORT',
      39: 'Team Detail / Sign'
    };
    return labels[n] || '';
  };

  if (reportType === 'BAIL MONITORING') {
    return (
      <div className="text-black leading-tight">
        <div className="text-center font-bold text-2xl mb-6 underline decoration-double uppercase">BAIL MONITORING REPORT</div>
        
        <table className="dossier-table w-full text-[11px]">
          <colgroup>
            <col style={{ width: '8%' }} />
            <col style={{ width: '42%' }} />
            <col style={{ width: '50%' }} />
          </colgroup>
          <tbody>
            <tr>
              <td className="text-center font-bold">1</td>
              <td className="font-bold bg-gray-50">नाम/उपनाम (Name/Alias)</td>
              <td className="whitespace-pre-wrap font-bold text-sm">{fields.bail_name}</td>
            </tr>
            <tr>
              <td className="text-center font-bold">2</td>
              <td className="font-bold bg-gray-50">सत्यापन का दिनांक/समय (Verification Date/Time)</td>
              <td className="whitespace-pre-wrap">{fields.bail_datetime}</td>
            </tr>
            <tr>
              <td className="text-center font-bold">3</td>
              <td className="font-bold bg-gray-50">जी०पी०एस० (GPS Location)</td>
              <td className="whitespace-pre-wrap">{fields.bail_gps}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td className="text-center font-bold" rowSpan={6}>4</td>
              <td className="font-bold bg-blue-50 uppercase text-xs" colSpan={2}>अपराधी की वर्तमान स्थिति (Present Status)</td>
            </tr>
            <tr>
              <td className="italic bg-gray-50 pl-4">(i) वर्तमान में कहाँ रह रहा है (Living at)</td>
              <td className="whitespace-pre-wrap">{fields.bail_living}</td>
            </tr>
            <tr>
              <td className="italic bg-gray-50 pl-4">(ii) व्यवसाय (Occupation)</td>
              <td className="whitespace-pre-wrap">{fields.bail_occupation}</td>
            </tr>
            <tr>
              <td className="italic bg-gray-50 pl-4">(iii) आपराधिक गतिविधि (Criminal activity)</td>
              <td className="whitespace-pre-wrap">{fields.bail_activity}</td>
            </tr>
            <tr>
              <td className="italic bg-gray-50 pl-4">(iv) आय का स्रोत (Means of income)</td>
              <td className="whitespace-pre-wrap">{fields.bail_income}</td>
            </tr>
            <tr>
              <td className="italic bg-gray-50 pl-4">(v) अन्य जानकारी (Other information)</td>
              <td className="whitespace-pre-wrap">{fields.bail_other}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td className="text-center font-bold">5</td>
              <td className="font-bold bg-gray-50">सत्यापनकर्ता (Verification done by)</td>
              <td className="whitespace-pre-wrap">{fields.bail_verifier}</td>
            </tr>
          </tbody>
        </table>

        {/* Verification Photos */}
        <div className="mt-8 border-t-4 border-black pt-4 page-break-avoid">
          <h3 className="font-bold text-lg underline uppercase mb-3">Verification Photos</h3>
          <div className="grid grid-cols-2 gap-4">
            {extraPhotos.map((url, i) => (
              <div key={i} className="border-2 border-black p-1 flex flex-col items-center page-break-avoid">
                <img src={url} className="max-w-full h-auto object-contain max-h-[300px]" alt={`Field Verification ${i + 1}`} />
                <div className="w-full bg-black/10 text-center py-1 mt-1">
                  <span className="text-[10px] font-bold uppercase">PHOTO {i + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Multimedia Assets - Always Hidden in Export */}
        <div className="no-print mt-12 pt-8 border-t-2 border-dashed border-gray-400">
          <h3 className="text-xl font-bold text-indigo-700 underline uppercase mb-4">Multimedia Assets (Reference Only)</h3>
          {videos.length > 0 && <div className="mb-4 text-xs font-bold text-gray-500">[{videos.length} Videos Attached - View Online]</div>}
          {audio.length > 0 && <div className="text-xs font-bold text-gray-500">[{audio.length} Voice Samples Attached - View Online]</div>}
        </div>
      </div>
    );
  }

  return (
    <div className="text-black leading-tight">
      <div className="text-center font-bold text-2xl mb-6 underline decoration-double uppercase">{reportType}</div>
      
      <table className="dossier-table w-full text-[11px]">
        <colgroup>
          <col style={{ width: '5%' }} />
          <col style={{ width: '30%' }} />
          <col style={{ width: '45%' }} />
          <col style={{ width: '20%' }} />
        </colgroup>
        
        {/* Profile Block */}
        <tbody>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
            <tr key={n}>
              <td className="text-center font-bold">{n}</td>
              <td className="font-bold bg-gray-50">{getLabel(n)}</td>
              <td className="whitespace-pre-wrap align-top">{fields[`f${n}`]}</td>
              {n === 1 && (
                <td rowSpan={10} className="bg-gray-50">
                  <div className="flex flex-col gap-1 items-center p-1">
                    <PhotoBox src={photos.p1} label="Front View" />
                    <PhotoBox src={photos.p2} label="Side View (L)" />
                    <PhotoBox src={photos.p3} label="Side View (R)" />
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
        
        <tbody>
          <tr>
            <td className="text-center font-bold">11</td>
            <td className="font-bold bg-gray-50">{getLabel(11)}</td>
            <td colSpan={2} className="whitespace-pre-wrap">{fields.f11}</td>
          </tr>
        </tbody>

        {/* Family Details Group */}
        <tbody>
          <tr>
            <td className="text-center font-bold" rowSpan={FAMILY_KEYS.length + 1}>12</td>
            <td className="font-bold bg-gray-100 uppercase text-[9px]" colSpan={3}>
              पारिवारिक विवरणी (Family Details)
            </td>
          </tr>
          {FAMILY_KEYS.map((key, idx) => (
            <tr key={key}>
              <td className="font-bold italic pl-4 bg-gray-50" colSpan={1}>{idx + 1}. {key === 'ChildrenDetail' ? 'Children Detail' : `${key} Detail`}</td>
              <td colSpan={2} className="whitespace-pre-wrap">{fields[`f12_${key}`]}</td>
            </tr>
          ))}
        </tbody>

        <tbody>
          <tr>
            <td className="text-center font-bold" rowSpan={2}>13</td>
            <td className="italic bg-gray-50 pl-4">1. फोटाग्राफ लेने की तिथि</td>
            <td colSpan={2} className="whitespace-pre-wrap">{fields.f13_PhotoDate}</td>
          </tr>
          <tr>
            <td className="italic bg-gray-50 pl-4">2. चक्रा एप में प्रविष्टि</td>
            <td colSpan={2} className="whitespace-pre-wrap">{fields.f13_ChakraApp}</td>
          </tr>
        </tbody>

        {/* Habits Group */}
        <tbody>
          <tr>
            <td className="text-center font-bold" rowSpan={HABIT_KEYS.length + 1}>14</td>
            <td className="font-bold bg-gray-50 uppercase text-[9px]" colSpan={3}>{getLabel(14)}</td>
          </tr>
          {HABIT_KEYS.map((key, idx) => (
            <tr key={key}>
              <td className="italic bg-gray-50 pl-4">{idx + 1}. {key}</td>
              <td colSpan={2} className="whitespace-pre-wrap">{fields[`f14_${key}`]}</td>
            </tr>
          ))}
        </tbody>

        {/* Marital Group */}
        <tbody>
          <tr>
            <td className="text-center font-bold" rowSpan={4}>15</td>
            <td className="font-bold bg-gray-50 uppercase text-[9px]" colSpan={3}>{getLabel(15)}</td>
          </tr>
          <tr>
            <td className="italic bg-gray-50 pl-4">1. वैवाहिक स्थिति</td>
            <td colSpan={2} className="whitespace-pre-wrap">{fields.f15_Status}</td>
          </tr>
          <tr>
            <td className="italic bg-gray-50 pl-4">2. ससुर विवरणी</td>
            <td colSpan={2} className="whitespace-pre-wrap">{fields.f15_FatherInLaw}</td>
          </tr>
          <tr>
            <td className="italic bg-gray-50 pl-4">3. साला विवरणी</td>
            <td colSpan={2} className="whitespace-pre-wrap">{fields.f15_BrotherInLaw}</td>
          </tr>
        </tbody>

        <tbody>
          <tr>
            <td className="text-center font-bold">16</td>
            <td className="font-bold bg-gray-50">{getLabel(16)}</td>
            <td colSpan={2} className="whitespace-pre-wrap">{fields.f16}</td>
          </tr>
        </tbody>

        <tbody>
          <tr>
            <td className="text-center font-bold" rowSpan={2}>17</td>
            <td className="italic bg-gray-50 pl-4">1. वकील पैरोकार</td>
            <td colSpan={2} className="whitespace-pre-wrap">{fields.f17_Lawyer}</td>
          </tr>
          <tr>
            <td className="italic bg-gray-50 pl-4">2. जमानतदार विवरणी</td>
            <td colSpan={2} className="whitespace-pre-wrap">{fields.f17_Guarantor}</td>
          </tr>
        </tbody>

        {[18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29].map(n => (
          <tbody key={n}>
            <tr>
              <td className="text-center font-bold">{n}</td>
              <td className="font-bold bg-gray-50">{getLabel(n)}</td>
              <td colSpan={2} className="whitespace-pre-wrap">{fields[`f${n}`]}</td>
            </tr>
          </tbody>
        ))}

        <tbody>
          <tr>
            <td className="text-center font-bold" rowSpan={5}>30</td>
            <td className="font-bold bg-blue-50 uppercase text-[9px]" colSpan={3}>{getLabel(30)}</td>
          </tr>
          {[
            'घटना का संक्षिप्त विवरण', 
            'घटना कारित करने का मंशा', 
            'घटना मे संलिप्त का नाम', 
            'Confession की संक्षिप्त विवरणी'
          ].map((s, idx) => (
            <tr key={s}>
              <td className="italic bg-gray-50 pl-4">{idx + 1}. {s}</td>
              <td colSpan={2} className="whitespace-pre-wrap">{fields[`f30_sub${idx+1}`]}</td>
            </tr>
          ))}
        </tbody>

        {[31, 32, 33].map(n => (
          <tbody key={n}>
            <tr>
              <td className="text-center font-bold">{n}</td>
              <td className="font-bold bg-gray-50">{getLabel(n)}</td>
              <td colSpan={2} className="whitespace-pre-wrap">{fields[`f${n}`]}</td>
            </tr>
          </tbody>
        ))}

        {/* Digital Details Group */}
        <tbody>
          <tr>
            <td className="text-center font-bold" rowSpan={DIGITAL_KEYS.length + 1}>34</td>
            <td className="font-bold bg-blue-50 underline uppercase text-xs" colSpan={3}>{getLabel(34)}</td>
          </tr>
          {DIGITAL_KEYS.map((key, idx) => (
            <tr key={key}>
              <td className="italic bg-gray-50 pl-4">{idx + 1}. {key} ID/Pass</td>
              <td colSpan={2} className="whitespace-pre-wrap">{fields[`f34_${key}`]}</td>
            </tr>
          ))}
        </tbody>

        {/* Docs Group */}
        <tbody>
          <tr>
            <td className="text-center font-bold" rowSpan={DOC_KEYS.length + 1}>35</td>
            <td className="font-bold bg-blue-50 underline uppercase text-xs" colSpan={3}>{getLabel(35)}</td>
          </tr>
          {DOC_KEYS.map((key, idx) => (
            <tr key={key}>
              <td className="italic bg-gray-50 pl-4">{idx + 1}. {key} Details</td>
              <td colSpan={2} className="whitespace-pre-wrap">{fields[`f35_${key}`]}</td>
            </tr>
          ))}
        </tbody>

        <tbody>
          <tr>
            <td className="text-center font-bold" rowSpan={2}>36</td>
            <td className="italic bg-gray-50 pl-4">1. जेल जाने का विवरणी</td>
            <td colSpan={2} className="whitespace-pre-wrap">{fields.f36_JailDetail}</td>
          </tr>
          <tr>
            <td className="italic bg-gray-50 pl-4">2. E-PRISON से प्राप्त विवरणी</td>
            <td colSpan={2} className="whitespace-pre-wrap">{fields.f36_EPrison}</td>
          </tr>
        </tbody>

        {[37, 38, 39].map(n => (
          <tbody key={n}>
            <tr>
              <td className="text-center font-bold">{n}</td>
              <td className="font-bold bg-gray-50">{getLabel(n)}</td>
              <td colSpan={2} className="whitespace-pre-wrap">{fields[`f${n}`]}</td>
            </tr>
          </tbody>
        ))}
      </table>

      {/* Appendix Section */}
      <div className="mt-8 border-t-4 border-black pt-4 page-break-avoid">
        <h3 className="font-bold text-lg underline uppercase mb-3">Appendix & Supporting Material</h3>
        <div className="text-[10px] whitespace-pre-wrap mb-6 p-2 bg-gray-50 border border-gray-200 min-h-[50px]">
          {fields.extra_text || 'No additional appendix data provided.'}
        </div>
        <div className="grid grid-cols-2 gap-4">
          {extraPhotos.map((url, i) => (
            <div key={i} className="border-2 border-black p-1 flex flex-col items-center page-break-avoid">
              <img src={url} className="max-w-full h-auto object-contain max-h-[300px]" alt={`Exhibit ${i + 1}`} />
              <span className="text-[9px] font-bold mt-1 uppercase">EXHIBIT {i + 1}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Multimedia Assets - Always Hidden in Export */}
      <div className="no-print mt-12 pt-8 border-t-2 border-dashed border-gray-400">
        <h3 className="text-xl font-bold text-indigo-700 underline uppercase mb-4">Multimedia Assets (Reference Only)</h3>
        {videos.length > 0 && <div className="mb-4 text-xs font-bold text-gray-500">[{videos.length} Videos Attached - View Online]</div>}
        {audio.length > 0 && <div className="text-xs font-bold text-gray-500">[{audio.length} Voice Samples Attached - View Online]</div>}
      </div>
    </div>
  );
};

const PhotoBox: React.FC<{ src: string | null; label: string }> = ({ src, label }) => (
  <div className="w-full h-32 border border-black bg-white flex flex-col items-center justify-center overflow-hidden relative">
    {src ? (
      <img src={src} className="w-full h-full object-cover" alt={label} />
    ) : (
      <span className="text-[8px] text-gray-400 font-bold uppercase">{label}</span>
    )}
    <div className="absolute bottom-0 w-full bg-black/60 text-white text-[8px] text-center py-0.5 uppercase tracking-tighter">{label}</div>
  </div>
);
