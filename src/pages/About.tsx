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
            The Story Behind the Phrases
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A principal product designer's journey into the wild world of idioms, 
            cultural nuance, and one very energetic chipmunk named Chippy.
          </p>
        </div>

        {/* Opening Story */}
        <Card className="mb-8 border-pink-200 shadow-lg">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Heart className="text-pink-500" />
              It Started with Danish Rain
            </h2>
            <div className="prose prose-lg text-gray-700 space-y-4">
              <p>
                When I first heard the Danish phrase <em>"Det regner skomagerdrenge"</em>, 
                I was completely bewildered. My Danish friend laughed and said it meant 
                "it's raining heavily." But literally? It means "it's raining shoemaker boys."
              </p>
              <p>
                That moment sparked something in me. Here was this beautiful, absurd expression 
                that carried centuries of cultural DNA—and no translation app could capture its soul. 
                I realized that language learning apps teach us words, but they don't teach us 
                how to <em>think</em> in another culture.
              </p>
              <p>
                And that's how Chippy was born. Not just as a mascot, but as a guide through 
                the wonderfully weird world of idioms that make each language uniquely human.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* The Design Challenge */}
        <Card className="mb-8 border-pink-200 shadow-lg">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Brain className="text-purple-500" />
              The Design Challenge
            </h2>
            <div className="prose prose-lg text-gray-700 space-y-4">
              <p>
                How do you make idioms engaging? They're often nonsensical, culturally specific, 
                and frankly, a bit intimidating. Traditional language apps treat them like vocabulary 
                to memorize. But I wanted to create something that felt like a game show—fun, 
                competitive, and slightly ridiculous.
              </p>
              <p>
                The breakthrough came when I realized that the <em>wrong</em> answers could be 
                just as educational as the right ones. When you see "Don't count your chickens 
                before they hatch" next to "Don't sell the skin before shooting the bear," 
                suddenly the Danish original makes perfect sense.
              </p>
              <p>
                Chippy emerged as our enthusiastic host—energetic enough to keep things light, 
                but wise enough to guide you through these linguistic adventures. Every gesture, 
                every celebration animation was crafted to make failure feel like discovery.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Technical Journey */}
        <Card className="mb-8 border-pink-200 shadow-lg">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Code2 className="text-blue-500" />
              Behind the Curtain: 379 Phrases, 20 Languages, Infinite Headaches
            </h2>
            <div className="prose prose-lg text-gray-700 space-y-4">
              <p>
                Building this seemed simple at first: collect some phrases, add multiple choice, 
                done. I was so naive. It turns out that curating 379 authentic idioms across 
                20 languages while ensuring cultural accuracy is... well, it's like herding cats 
                who speak different languages.
              </p>
              <p>
                The real challenge wasn't the React components or the Supabase integration—it 
                was the linguistics. Take "Det regner skomagerdrenge" again. The literal 
                translation is hilarious but useless. The cultural equivalent "It's raining 
                cats and dogs" conveys the meaning but loses the charm. We needed both.
              </p>
              <p>
                Then came the text-to-speech integration. Getting ElevenLabs to pronounce 
                "skomagerdrenge" correctly while maintaining natural intonation across 20 
                languages? That's where the real product design happened—balancing technical 
                constraints with user experience.
              </p>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="text-center p-4 bg-pink-50 rounded-lg">
                <div className="text-2xl font-bold text-pink-600">379</div>
                <div className="text-sm text-gray-600">Phrases Curated</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">20</div>
                <div className="text-sm text-gray-600">Languages</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">∞</div>
                <div className="text-sm text-gray-600">Cultural Insights</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">1</div>
                <div className="text-sm text-gray-600">Energetic Chipmunk</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Learnings */}
        <Card className="mb-8 border-pink-200 shadow-lg">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Lightbulb className="text-yellow-500" />
              What Building This Taught Me
            </h2>
            <div className="space-y-6">
              <div className="border-l-4 border-pink-300 pl-4">
                <h3 className="font-semibold text-gray-800 mb-2">Design Systems Are Everything</h3>
                <p className="text-gray-700">
                  Every color, every animation, every state transition needed to feel cohesive. 
                  Chippy's celebrations, the progress indicators, the gentle failure states—they 
                  all speak the same visual language because consistency builds trust.
                </p>
              </div>
              
              <div className="border-l-4 border-purple-300 pl-4">
                <h3 className="font-semibold text-gray-800 mb-2">Internationalization Is Cultural, Not Technical</h3>
                <p className="text-gray-700">
                  Sure, React i18n handles the text replacement. But the real challenge is 
                  cultural sensitivity—ensuring that our wrong answers aren't accidentally 
                  offensive and our explanations respect linguistic heritage.
                </p>
              </div>
              
              <div className="border-l-4 border-blue-300 pl-4">
                <h3 className="font-semibold text-gray-800 mb-2">Progressive Enhancement Saves Lives</h3>
                <p className="text-gray-700">
                  When the TTS fails, the game still works. When JavaScript is slow, the core 
                  experience remains. Every feature gracefully degrades because accessibility 
                  isn't optional—it's good design.
                </p>
              </div>
              
              <div className="border-l-4 border-yellow-300 pl-4">
                <h3 className="font-semibold text-gray-800 mb-2">Joy Is a Feature, Not a Nice-to-Have</h3>
                <p className="text-gray-700">
                  Chippy's silly celebrations, the satisfying progress animations, the gentle 
                  encouragement after wrong answers—these aren't decorations. They're core 
                  product features that make learning feel like playing.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technology Stack */}
        <Card className="mb-8 border-pink-200 shadow-lg">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Globe className="text-green-500" />
              The Tech Stack That Made It Possible
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
            <p className="text-gray-700 mt-4">
              Each tool was chosen not just for capability, but for how well it supported 
              rapid iteration and international deployment. When you're dealing with 20 
              languages and cultural nuance, flexibility beats complexity every time.
            </p>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="border-pink-200 shadow-lg bg-gradient-to-r from-pink-50 to-purple-50">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Ready to Meet Some Shoemaker Boys?
            </h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Now that you know the story, it's time to experience the joy. Chippy's waiting 
              to guide you through a world where it rains children and cats walk carefully 
              around hot porridge. Trust me, it makes sense when you get there.
            </p>
            <Link to="/">
              <Button size="lg" className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3">
                Start Your Journey with Chippy
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;