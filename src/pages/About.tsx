import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Globe, Brain, Mic, Code2, Heart, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import MascotAvatar from "@/components/MascotAvatar";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200/60 to-fuchsia-100/90 pb-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <MascotAvatar size={120} className="mb-6" />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            About Guess That Phrase
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4">
            A random game idea turned into a phrase-guessing adventure with Chippy.
          </p>
          <p className="text-sm text-gray-500">
            Built by{" "}
            <a 
              href="https://ghaz.work" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-pink-600 hover:text-pink-700 font-medium"
            >
              Ghazaleh Somerville
            </a>
          </p>
        </div>

        {/* The Build */}
        <Card className="mb-8 border-pink-200 shadow-lg">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Code2 className="text-blue-500" />
              The vibe coding journey
            </h2>
            <div className="prose prose-lg text-gray-700 space-y-4">
              <p>
                Had a random idea for a phrase guessing game one day and decided to just... build it. 
                No grand plan, no market research - just wanted to see if I could make something fun 
                with idioms from different languages.
              </p>
              <p>
                What started as a simple concept quickly became an exploration into text-to-speech 
                APIs, multilingual support, and making a chipmunk mascot feel alive. Turns out 
                getting pronunciation right across 20 languages is way harder than expected.
              </p>
              <p>
                Still an ongoing process too - constantly fixing phrase translations and literal 
                meanings to make sure they actually make sense across all the different languages. 
                Turns out idioms don't translate as cleanly as you'd hope.
              </p>
              <p>
                The result? 379 phrases, one energetic chipmunk, and way more TypeScript than 
                I originally planned for.
              </p>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="text-center p-4 bg-pink-50 rounded-lg">
                <div className="text-2xl font-bold text-pink-600">379</div>
                <div className="text-sm text-gray-600">Phrases</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">20</div>
                <div className="text-sm text-gray-600">Languages</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">1</div>
                <div className="text-sm text-gray-600">Chipmunk</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">∞</div>
                <div className="text-sm text-gray-600">Fun</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technology Stack */}
        <Card className="mb-8 border-pink-200 shadow-lg">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Globe className="text-green-500" />
              The tech stack that made it possible
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Badge variant="outline" className="p-3 text-center justify-center">
                React + TypeScript
              </Badge>
              <Badge variant="outline" className="p-3 text-center justify-center">
                Tailwind CSS
              </Badge>
              <Badge variant="outline" className="p-3 text-center justify-center">
                Supabase
              </Badge>
              <Badge variant="outline" className="p-3 text-center justify-center">
                ElevenLabs TTS
              </Badge>
              <Badge variant="outline" className="p-3 text-center justify-center">
                React Router
              </Badge>
              <Badge variant="outline" className="p-3 text-center justify-center">
                Lovable Platform
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="border-pink-200 shadow-lg bg-gradient-to-r from-pink-50 to-purple-50">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Ready to play?
            </h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Jump in and see how many phrases you can guess with Chippy's help!
            </p>
            <Link to="/">
              <Button size="lg" className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3">
                Start Playing
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;