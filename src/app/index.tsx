import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [isXNext, setIsXNext] = useState(true);

  const handlePress = (index: number) => {
    if (board[index] || calculateWinner(board)) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every((cell) => cell !== '');

  const resetGame = () => {
    setBoard(Array(9).fill(''));
    setIsXNext(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game Tic Tac Toe</Text>
      
      <Text style={styles.status}>
        {winner ? `Pemenang: ${winner}` : isDraw ? 'Game Seri!' : `Giliran Pemain: ${isXNext ? 'X' : 'O'}`}
      </Text>

      <View style={styles.board}>
        {board.map((cell, index) => (
          <TouchableOpacity
            key={index}
            style={styles.cell}
            onPress={() => handlePress(index)}
          >
            <Text style={[styles.cellText, cell === 'X' ? styles.xText : styles.oText]}>
              {cell}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
        <Text style={styles.resetButtonText}>Mulai Ulang</Text>
      </TouchableOpacity>
    </View>
  );
}

function calculateWinner(squares: string[]) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Baris horisontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Kolom vertikal
    [0, 4, 8], [2, 4, 6]             // Garis diagonal
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333333',
  },
  status: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: '600',
    color: '#666666',
  },
  board: {
    width: 300,
    height: 300,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 2,
    borderColor: '#333333',
    backgroundColor: '#333333',
  },
  cell: {
    width: '33.33%',
    height: '33.33%',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#333333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  xText: {
    color: '#007AFF',
  },
  oText: {
    color: '#FF3B30',
  },
  resetButton: {
    marginTop: 30,
    backgroundColor: '#333333',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  resetButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});