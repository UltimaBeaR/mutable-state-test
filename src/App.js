import './App.css';
import { useRerender, useMutableState } from './hooks';

function App() {
  // внутренности state можно спокойно мутировать, главное вызвать в итоге rerender()
  // также нельзя юзать десруктуризацию, т.к. нужно мутировать внутренности объекта, а не копию
  // Важно чтобы стейт был всегда объектом или массивом (ссылочный тип) и мутировать можно только
  // внутренности, но не сам объект
  const state = useMutableState({
    testNumber: 5,
    testString: 'number == 5',
    timeoutCalls: 0,
  });

  // триггерит ререндер. Можно вызывать сколько угодно раз
  const rerender = useRerender();

  function handleClick() {
    // паттерн использования - мутируем стейт и вызываем rerender()
    // можно мутировать стейт много раз в разных внутренних функциях, достаточно в итоге хотя бы
    // один раз вызвать rerender()

    increment();

    if (state.testNumber >= 100) {
      state.testString = 'number >= 100';
      rerender();

      // В общем случае тут нужен быть deep copy
      const capturedState = { ...state };

      setTimeout(() => {
        // Возьмется последний актуальный стейт
        console.log('timeout - current state', JSON.stringify(state));

        // Возьмется копия стейта на момент установки setTimeout
        console.log('timeout - state snapshot', JSON.stringify(capturedState));

        // Из таймаутов также работает мутация стейта и вызов ререндера

        state.timeoutCalls += 1;
        rerender();
      }, 1000);
    }
  }

  function increment() {
    state.testNumber += 10;
    state.testString = `number == ${state.testNumber}`;
    rerender();
  }

  return (
    <div>
      from state: {state.testString}
      <br />
      timeout calls: {state.timeoutCalls}
      <br />
      <button onClick={handleClick}>Action</button>
    </div>
  );
}

export default App;
