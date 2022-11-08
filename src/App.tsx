import React, {useState, useEffect} from 'react';
import db from './db.json';
import {i18nLabels, defaultLang, $lang0, setLang} from './i18n';
import {events, i18nEventNames, presets} from './events';
import styles from './App.module.sass';

const langs = [
  'English',
  'French (Canada)',
  'French (France)',
  'German',
  'Italian',
  'Japanese',
  'Russian',
  'Spanish (Latin)',
  'Spanish (Spain)',
] as const;
const dbEntries = Object.entries(db);

const f2f = (f: number) => {
  let sign = '';
  if (f < 0) {
    sign = '-';
    f = -f;
  }
  const sf = String(f%30)+'f';
  const s = f/30|0;
  if (s === 0) return sign+sf;
  const ssf = `${s%30}:${sf.padStart(3, '0')}`;
  const m = s/60|0;
  if (m === 0) return sign+ssf;
  return `${sign}${m}:${ssf.padStart(6, '0')}`;
};
const f2s = (f: number) => {
  let sign = '';
  if (f < 0) {
    sign = '-';
    f = -f;
  }
  const s = f/30;
  const m = s/60|0;
  const ss = (s-m*60).toFixed(3);
  return sign+(m ? `${m}:${ss.padStart(6, '0')}` : ss);
};

export const RadioGroup = ({name, value: val, values, onChange, ...props}: {
  values: (string | [value: string, label: string])[]
} & React.ComponentProps<'input'>) => <>{values.map(o => {
  const [value, label] = typeof o === 'string' ? [o, o] : o;
  return <div key={value} {...props}>
    <input type='radio' name={name} value={value} checked={val===value}
      onChange={onChange} />
    <span>{label}</span>
  </div>;
})}</>;

function App() {
  const [selected, setSelected] = useState(
    Object.fromEntries(events.map(l => [l, false])),
  );
  const [timeFormat, setTimeFormat] = useState('s');
  const f2t = timeFormat === 'f' ? f2f : f2s;

  const [$lang, set$lang] = useState($lang0);
  useEffect(() => setLang($lang), [$lang]);

  const eventNames = i18nEventNames[
    ($lang in i18nEventNames) ? $lang : defaultLang
  ];
  const L = (id: keyof typeof i18nLabels) =>
    i18nLabels[id][$lang] ?? i18nLabels[id][defaultLang];

  const selectedTimes = dbEntries.filter(([event]) => selected[event]);
  const l2tEntries = langs.map(
    lang => [lang, selectedTimes.reduce(
      (sum, [_event, times]) => sum+times[lang],
      0,
    )] as const,
  ).sort(([_a, tA], [_b, tB]) => tA-tB);
  const tMin = Math.min(...l2tEntries.map(([_, t]) => t));

  return <div>
    <details>
      <summary>CREADITS</summary>
      <div>
        <p>This tool is made by sup39 with MIT license. The source code can be found <a href='https://github.com/sup39/botw-lang-cmp'>here</a>.</p>
        <p><a href='https://github.com/sup39/botw-lang-cmp/src/db.json'>Time data</a> is based on <a href='https://docs.google.com/document/d/1H0gqxqR2AZqc-MEDUoftJHn_FteyBBm_Zcowieev5ek/edit?usp=sharing'>Cephla's document</a>, which is based on <a href='https://youtu.be/yVaZdsgjWz8'>Swiffy22's video</a>.</p>
      </div>
    </details>
    <h2>Time Comparison</h2>
    <section>
      <table className="time">
        <thead><tr>
          <th>Language</th>
          <th>Time</th>
          <th>Diff</th>
        </tr></thead>
        <tbody>{l2tEntries.map(([lang, t]) => <tr key={lang}>
          <td>{lang}</td>
          <td>{f2t(t)}</td>
          <td>{(t>tMin?'+':'±')+f2t(t-tMin)}</td>
        </tr>)}</tbody>
      </table>
    </section>
    <section>
      <h3>Settings</h3>
      <div className={styles.SettingsRoot}>
        <div>
          <span>{L('displayLang')}</span>
          <select value={$lang} onChange={e=>set$lang(e.target.value)}>
            <option value='en-US'>English</option>
            <option value='ja-JP'>日本語</option>
          </select>
        </div>
        <div>
          <span>{L('timeFormat')}</span>
          <RadioGroup name='timeFormat' value={timeFormat}
            values={[['s', 'ms'], 'f']}
            onChange={e => setTimeFormat(e.target.value)} />
        </div>
      </div>
    </section>
    <section>
      <h3>Preset</h3>
      <div>
        <select
          defaultValue=''
          onChange={e => {
            const sels = presets[e.target.value];
            if (sels == null) return;
            setSelected(sels);
          }}
        >
          <option value=''>==== Choose a preset ====</option>
          {Object.keys(presets).map(
            name => <option key={name} value={name}>{name}</option>,
          )}
        </select>
      </div>
    </section>
    <section>
      <h3>Cutscenes</h3>
      <div>
        {events.map(id => <div key={id} className='option-ctn'>
          <input
            type='checkbox' checked={selected[id]}
            onChange={e => setSelected(o => ({...o, [id]: e.target.checked}))}
          />
          <span>{eventNames[id]}</span>
        </div>)}
      </div>
    </section>
  </div>;
}

export default App;
