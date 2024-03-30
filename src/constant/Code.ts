export const javascript = `
const input = require('fs')
    .readFileSync(0, 'utf-8')
    .toString()
    .trim();

console.log('hello : ' + input);
`;

export const java = `
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String name = reader.readLine();
        System.out.println("hello + " + name);
        reader.close();
    }
}

`;

export const cpp = `
#include <iostream>
#include <string>

int main() {
    std::string input;
    std::getline(std::cin, input);
    input.erase(input.find_last_not_of(" \n\r\t")+1);
    std::cout << "hello : " << input << std::endl;
    return 0;
}
`;

export const python = `
import sys

input = sys.stdin.read().strip()
print('hello :', input)
`;

export default {
  cpp,
  python,
  java,
  javascript,
};
