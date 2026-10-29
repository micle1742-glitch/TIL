/*
 * questions.js → 주차별 md(1주차.md ~ N주차.md) 생성 스크립트
 * 사용법 (어느 위치에서 실행해도 됨):
 *   node tools/gen.js        전체 주차 생성
 *   node tools/gen.js 1 2    지정한 주차만 생성
 * 경로는 이 파일(tools/gen.js) 기준 상위 폴더(midterm-quiz/)이다.
 */
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..') + path.sep;
const Q = eval(fs.readFileSync(dir + 'questions.js', 'utf8') + '\n;QUESTIONS');
const lang = { 1: 'js', 2: 'js', 3: 'js', 4: 'java', 5: 'java', 6: 'sql', 7: 'java' };
const TYPE_LABEL = { concept: '개념', short: '단답', choice: '객관식' };
const MARK = ['①', '②', '③', '④', '⑤'];
const weeksArg = process.argv.slice(2).map(Number);
const weeks = weeksArg.length ? weeksArg : [...new Set(Q.map((q) => q.week))];
for (const w of weeks) {
  // 번호는 hidden 포함 원래 순서로 매기고, hidden 문제는 출력에서만 뺀다
  const qs = Q.filter((q) => q.week === w).map((q, i) => ({ ...q, no: i + 1 })).filter((q) => !q.hidden);
  const topics = new Map();
  qs.forEach((q, i) => {
    if (!topics.has(q.topic)) topics.set(q.topic, []);
    topics.get(q.topic).push(q.no);
  });
  let out = `# ${w}주차 중간평가 대비 문제\n\n범위: ${[...topics.keys()].join(', ')}\n\n`;
  out += `- 유형: [개념] 설명을 보고 개념 이름 맞추기 / [단답] 짧은 코드 결과 쓰기·빈칸 채우기 / [객관식] 보기 4개 중 고르기\n- 정답은 맨 아래에 있습니다.\n\n---\n\n# 문제\n\n`;
  qs.forEach((q, i) => {
    out += `**${q.no}.** [${TYPE_LABEL[q.type]}] ${q.question}\n`;
    if (q.code) out += `\n\`\`\`${lang[w] || ''}\n${q.code}\n\`\`\`\n`;
    if (q.options) out += '\n' + q.options.map((o, j) => `${MARK[j]} \`${o}\``).join('  \n') + '\n';
    out += '\n';
  });
  out += `---\n\n# 정답\n\n| 번호 | 정답 | 해설 |\n|---|---|---|\n`;
  const esc = (s) => String(s).replace(/\|/g, '\\|').replace(/\n/g, '<br>');
  qs.forEach((q, i) => {
    const a = q.options ? `${MARK[q.options.indexOf(q.answer)]} ${q.answer}` : q.answer;
    out += `| ${q.no} | ${esc(a)} | ${esc(q.explanation)} |\n`;
  });
  out += `\n---\n\n## 주제별 문제 수 요약\n\n| 주제 | 문제 수 | 번호 |\n|---|---|---|\n`;
  for (const [t, nums] of topics) out += `| ${t} | ${nums.length} | ${nums.join(', ')} |\n`;
  const n = (t) => qs.filter((q) => q.type === t).length;
  out += `\n- 합계: ${qs.length}문제 (개념 ${n('concept')}, 단답 ${n('short')}, 객관식 ${n('choice')})\n`;
  fs.writeFileSync(dir + `${w}주차.md`, out, 'utf8');
  console.log(w, qs.length, n('concept'), n('short'), n('choice'));
}
