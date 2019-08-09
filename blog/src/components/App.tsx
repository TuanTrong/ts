import React from "react";
import { IAppState } from "../reducers";
import { ITodo, fetchTodos, deleteTodo } from "../actions";
import { connect } from "react-redux";

interface IAppProps {
  todos: ITodo[];
  onFetch(): Promise<void>;
  onDelete: typeof deleteTodo;
}

interface IAppComponentState {
  isLoading: boolean;
}

class _App extends React.Component<IAppProps, IAppComponentState> {
  constructor(props: IAppProps) {
    super(props);

    this.state = { isLoading: false };
  }

  onFetch = async (): Promise<void> => {
    this.setState({ isLoading: true });
    await this.props.onFetch();
    this.setState({ isLoading: false });
  };

  renderList = (): JSX.Element[] => {
    return this.props.todos.map(todo => {
      return (
        <div key={todo.id} onClick={() => this.props.onDelete(todo.id)}>
          {todo.title}
        </div>
      );
    });
  };

  render() {
    return (
      <div>
        <button onClick={this.onFetch}>Fetch</button>
        {this.state.isLoading && <div>Loading</div>}
        {this.renderList()}
      </div>
    );
  }
}

const mapStateToProps = (state: IAppState) => {
  return { todos: state.todos };
};

export const App = connect(
  mapStateToProps,
  { onFetch: fetchTodos, onDelete: deleteTodo }
)(_App);
