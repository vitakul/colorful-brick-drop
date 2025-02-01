import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

interface LeaderboardEntry {
  nick: string;
  score: number;
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ entries }) => {
  return (
    <div className="bg-black/20 p-4 rounded-lg">
      <h3 className="text-lg font-bold mb-4 text-white">Top Players</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Player</TableHead>
            <TableHead>Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((entry, index) => (
            <TableRow key={index}>
              <TableCell className="text-white">{entry.nick}</TableCell>
              <TableCell className="text-white">{entry.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Leaderboard;