/**
 * Runs before first paint so there is never a flash of the wrong theme.
 * Kept deliberately tiny and dependency-free — it is inlined into <head>.
 */
const script = `(function(){try{var t=localStorage.getItem("royto-theme");if(t==="dark"||t==="light"){document.documentElement.setAttribute("data-theme",t)}}catch(e){}})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
