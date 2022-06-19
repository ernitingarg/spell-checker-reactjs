import React, { Component } from "react";

class SpellCheck extends Component {
  state = {
    input: "",
    errorMessage: "",
    isSubmitted: false,
  };

  handleChange(e) {
    this.setState({ input: e.target.value });

    if (!e.target.value) {
      this.setState({ isSubmitted: false });
      this.setState({ errorMessage: "" });
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ errorMessage: "" });
    this.setState({ isSubmitted: true });

    var words = this.state.input.trim().split(/\s+/).join("|");

    // const apiUrl = `http://localhost:8080/checkwords/${words}`;
    const apiUrl = `https://spell-checker.azurewebsites.net/checkwords/${words}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (Object.keys(data).length > 0) {
          this.setState({
            errorMessage: `Non-English words: ${data.join(", ")}`,
          });
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  render() {
    return (
      <form>
        <input
          type="text"
          value={this.state.input}
          placeholder="Input phrase in English."
          onChange={this.handleChange.bind(this)}
        />
        <br />
        <button
          type="submit"
          onClick={this.handleSubmit.bind(this)}
          style={{ backgroundColor: !this.state.input ? "grey" : null }}
          disabled={!this.state.input}
        >
          CHECK
        </button>
        <br />
        <br />
        {this.state.errorMessage ? (
          <div>
            <img
              align="wrong"
              src={require("../images/wrong.jpg")}
              alt=""
              height={100}
              width={100}
            />
            <h4 style={{ color: "red" }}>{this.state.errorMessage}</h4>
          </div>
        ) : (
          <>
            {this.state.isSubmitted ? (
              <div>
                <img
                  align="correct"
                  src={require("../images/correct.jpg")}
                  alt=""
                  height={100}
                  width={100}
                />
              </div>
            ) : null}
          </>
        )}
      </form>
    );
  }
}

export default SpellCheck;
