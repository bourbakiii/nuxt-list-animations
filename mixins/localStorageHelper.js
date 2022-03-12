export default save_at_local = function({
    name = null,
    value = null }) {
    if (!name || !value) return alert(`Переданы не все параметры - name:${name ?? 'ПУСТО'}, value:${value ?? 'ПУСТО'}`);
    if (typeof localStorage != undefined) localStorage.setItem(name, value);
    else alert('LocalStorage не прогружен');
}