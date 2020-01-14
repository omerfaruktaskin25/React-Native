import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({

  rootView : {
    height          : '100%',
    padding         : 10,
    backgroundColor : '#000000'
  },

  resultView : {
    height            : '25%',
    borderBottomWidth : 1,
    borderColor       : '#AAAAAA',
    alignItems        : 'flex-end',
    justifyContent    : 'space-evenly',
    padding           : 10,
  },

  operationText : {
    fontWeight        : 'bold',
    color             : '#FFFFFF',
    fontSize          : 25,
    height            : '40%',
    textAlignVertical : 'bottom',
    textAlign         : 'right',
  },

  buttonView : {
    marginTop       : 15,
    flexDirection   : 'row',
    flexWrap        : 'wrap',
    justifyContent  : 'space-evenly',
    height          : '20%',
  },
  
  classicButton : {
    backgroundColor : '#333333',
    borderRadius    : 1,
    marginTop       : 10,
    width           : '22%',
    height          : '50%',
    alignItems      : 'center',
  },

  zeroButton : {
    backgroundColor : '#333333',
    borderRadius    : 1,
    marginTop       : 10,
    width           : '46%',
    height          : '50%',
    alignItems      : 'center',
  },

  equalButton : {
    backgroundColor : '#FF9501',
    borderRadius    : 1,
    marginTop       : 10,
    width           : '95%',
    height          : '50%',
    alignItems      : 'center',
  },

  threeTopButtons : {
    backgroundColor : '#A6A6A6',
    borderRadius    : 1,
    marginTop       : 10,
    width           : '22%',
    height          : '50%',
    alignItems      : 'center',
  },

  rightButton : {
    backgroundColor : '#FF9501',
    borderRadius    : 1,
    marginTop       : 10,
    width           : '22%',
    height          : '50%',
    alignItems      : 'center',
  },

  buttonText  : {
    width             : '100%',
    height            : '100%',
    textAlign         : 'center',
    textAlignVertical : 'center',
    color             : 'white',
    fontSize          : 30,
    fontWeight        : 'bold',
  },
}); 


class Calculator extends React.Component {
  state = {
    operation : '',
    result    : '0',
    size      : 60,
  }

  getInfix(text) {
    var infix = [];
    
    for (var i = 0; i < text.length; i++) {
      var temp;

      if (text[i] == '-') {
        // Sub
        if (i == 0 || text[i - 1] == '/' || text[i - 1] == 'x' || text[i - 1] == '(') {
          //Number
          temp = text[i];
          for (var j = i + 1; j < text.length; j++) {
            if (text[j] != '/' && text[j] != 'x' && text[j] != '+' && text[j] != '(' && text[j] != ')' && text[j] != '-') {
              temp += text[j];
              i = j;
            } else {
              break;
            }
          }
        } else {
          // Operator
          temp = text[i];
        }
        // -Sub
      } else if (text[i] == '/' || text[i] == 'x' || text[i] == '(' || text[i] == ')' || text[i] == '+') {
        temp = text[i];
      } else {
        temp = text[i];
        for (var j = i + 1; j < text.length; j++){
          if (text[j] != '/' && text[j] != 'x' && text[j] != '+' && text[j] != '(' && text[j] != ')' && text[j] != '-') {
            temp += text[j];
            i = j;
          } else {
            break;
          }
        }
        console.log(temp);
      }
      infix.push(temp);
    }
    
    return infix;
  }

  getPostfix(infix) {
    var postfix = [];
    var stack   = [];
    infix.forEach(value => {
      console.log('\nStack : \'' + stack + '\'\nPostfix : \'' + postfix + '\'\n--------------------');
      switch (value) {
        case ')': {
          for (var i = stack.length - 1; i >= 0; i--){
            if (stack[i] == '(') {
              stack.pop();
              break;
            } else {
              postfix.push(stack.pop());
            }
          }
          break;
        }

        case '(': {
          stack.push(value);
          break;
        }

        case 'x': {
          if (stack.length == 0) {
            stack.push(value);
          } else if (stack[stack.length - 1] == 'x' || stack[stack.length - 1] == '/') {
            for (var i = stack.length -1; i >= 0; i--) {
              if (stack[i] != '(' && stack[i] != '+' && stack[i] != '-')
                postfix.push(stack.pop());
              else
                break;
            }
            stack.push(value);

          } else {
            stack.push(value);
          }
          break;
        }
        
        case '/': {
          if (stack.length == 0) {
            stack.push(value);
          } else if (stack[stack.length - 1] == 'x' || stack[stack.length - 1] == '/') {
            for (var i = stack.length -1; i >= 0; i--) {
              if (stack[i] != '(' && stack[i] != '+' && stack[i] != '-')
                postfix.push(stack.pop());
              else
                break;
            }
            stack.push(value);

          } else {
            stack.push(value);
          }
          break;
        }

        case '+': {
          if (stack.length == 0) {
            stack.push(value);
          } else if (stack[stack.length - 1] == 'x' || stack[stack.length - 1] == '/' || stack[stack.length - 1] == '+' || stack[stack.length - 1] == '-') {
            for (var i = stack.length -1; i >= 0; i--) {
              if (stack[i] != '(')
                postfix.push(stack.pop());
              else
                break;
            }
            stack.push(value);

          } else {
            stack.push(value);
          }
          break;
        }

        case '-' : {
          if (stack.length == 0) {
            stack.push(value);
          } else if (stack[stack.length - 1] == 'x' || stack[stack.length - 1] == '/' || stack[stack.length - 1] == '+' || stack[stack.length - 1] == '-') {
            for (var i = stack.length -1; i >= 0; i--) {
              if (stack[i] != '(')
                postfix.push(stack.pop());
              else
                break;
            }
            stack.push(value);

          } else {
            stack.push(value);
          }
          break;
        }

        default : {
          // Number
          postfix.push(value);
          break;
        }
      }
    });
    
    while (stack.length > 0)
      postfix.push(stack.pop());

    console.log('\nStack : \'' + stack + '\'\nPostfix : \'' + postfix + '\'\n--------------------');
    return postfix;
  }
  
  calculate(text) {
    var infix = this.getInfix(text);
    console.log('\n---------- INFIX ----------\n' + infix + '\n---------------------------');
    var postfix = this.getPostfix(infix);
    console.log('\n--------- POSTFIX ---------\n' + postfix + '\n---------------------------');

    var result  = 0.0;
    var stack   = [];
    var temp    = postfix;
    postfix.forEach(value => {
      console.log(temp);
      console.log('Stack : ' + stack);
      console.log('value : ' + value);
      if (value == '+' || value == '-' || value == 'x' || value == '/') {
        var num2 = parseFloat(stack.pop());
        var num1 = parseFloat(stack.pop());
        
        console.log('Here I am');
        switch (value) {
          case '+': {
            result = num1 + num2;
            stack.push(result);
            break;
          }

          case '-': {
            result = num1 - num2;
            stack.push(result);
            break;
          }

          case 'x': {
            result = num1 * num2;
            stack.push(result);
            break;
          }

          case '/': {
            result = num1 / num2;
            stack.push(result);
            break;
          }
        }
      } else {
        stack.push(value);
      }
      
    });
    result = stack.pop();
    this.setState({result:result.toString()});
    console.log('\nSonuç : ' + result);
  }

  newButton(value, buttonStyle = styles.classicButton) {
    return (
      <TouchableOpacity style = { buttonStyle } onPress = { () => this.onPressButton(value) } >
        <Text style = { styles.buttonText }>{ value }</Text>
      </TouchableOpacity>
    )
  }

  onPressButton(text) {
    if (this.state.result.length >= 10)
      this.setState({size : 40})
    else
      this.setState({size : 60})

    if (text == '=') {
      this.setState({operation: this.state.result})
      this.calculate(this.state.result);
    } else if (text == 'AC') {
      // if pressed clear button
      this.setState({result : '0', operation : ''})
   } else if (text == '\u232B') {
      // If pressed backspace button 
      if (this.state.result.length == 1)
        this.setState({result : '0'})
      else
        this.setState({result : this.state.result.substring(0, this.state.result.length - 1)})

    } else if (this.state.result != '0' && ( text == '/' || text == 'x' || text == '-' || text == '+' || text == '.')) {
      
      if (this.state.result.charAt(this.state.result.length - 1) == '-' && text == '-')
        return;
      else if ((this.state.result.charAt(this.state.result.length - 1) == 'x' || this.state.result.charAt(this.state.result.length - 1) == '/') && text == '-') {
        this.setState({result : this.state.result + text});
        return;
      }

      if ((this.state.result.charAt(this.state.result.length - 1) != '/' &&
          this.state.result.charAt(this.state.result.length - 1) != '+'  &&
          this.state.result.charAt(this.state.result.length - 1) != 'x'  &&
          this.state.result.charAt(this.state.result.length - 1) != '.') ||
          (this.state.result.charAt(this.state.result.length - 1) == '-' && 
          (text != '/' && text != '.' && text != '+' && text != 'x' && text != '-')) ) {

          if ((this.state.result.charAt(this.state.result.length - 1) == '(' || this.state.result.charAt(this.state.result.length - 1) == '-') &&
              (text == '/' || text == '.' || text == '+' || text == 'x')) {
              return;
          } else {
            this.setState({result : this.state.result + text});
          } 
      } else {
        return;
      }
      
    } else {
      // If pressed operators or '.' and result is 0
      if (this.state.result == '0' && (text == '/' || text == 'x' || text == '+' || text == '.' || text == ')'))
        return;

      // if pressed number and result is 0
      if (this.state.result == '0') {
        this.setState({result : text})
      } else {
        this.setState({result : this.state.result + text})
      }
    }

  }

  render() {

    const buttonTexts = [ 'AC', '(', ')', '\u232B', '1', '2', '3', '/', '4', '5', '6', 'x', '7', '8', '9', '-', '0', '.', '+', '=' ]

    return(
      <View style = { styles.rootView }>

          <View style = { styles.resultView } >
            <Text style = { styles.operationText }> { this.state.operation }</Text>
            <Text style = {{
                  fontWeight        : 'bold',
                  color             : '#FFFFFF',
                  fontSize          : this.state.size,
                  width             : '100%',
                  height            : '60%',
                  textAlignVertical : 'bottom',
                  textAlign         : 'right',
            }}> { this.state.result } </Text>
          </View>

          <View style = { styles.buttonView }>
            {
              buttonTexts.map((value, index) => {

                if (value == '0')
                    return this.newButton(value, styles.zeroButton);
                else if (value == '=')
                    return this.newButton(value, styles.equalButton);
                else if ((parseInt(index, 10) + 1) % 4 == 0 || value == '-' || value == '+')
                  return this.newButton(value, styles.rightButton);
                else if (index < 3)
                  return this.newButton(value, styles.threeTopButtons);
                else
                  return this.newButton(value);
              })

            }
          </View>
      </View>
    )
  }
}

export default Calculator;