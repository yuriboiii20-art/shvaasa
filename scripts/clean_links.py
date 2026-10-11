import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('index.html', 'r', encoding='utf-8') as f:
    c = f.read()

replacements = {
    'href="about.html"': 'href="#about"',
    'href="our-doctors.html"': 'href="#about"',
    'href="why-choose-us.html"': 'href="#why-choose-us"',
    'href="testimonials.html"': 'href="#testimonials"',
    'href="faq.html"': 'href="#faq"',
    'href="gallery.html"': 'href="#gallery"',
    'href="contact.html"': 'href="#contact"',
    'href="book-appointment.html"': 'href="#book-appointment"',
    'href="allergy-skin-prick-testing.html"': 'href="#allergy-treatments"',
    'href="allergy-immunotherapy.html"': 'href="#allergy-treatments"',
    'href="allergy-allergic-rhinitis.html"': 'href="#allergy-treatments"',
    'href="allergy-asthma-care.html"': 'href="#allergy-treatments"',
    'href="allergy-food-diet-plans.html"': 'href="#allergy-treatments"',
    'href="ent-ear-conditions.html"': 'href="#ent-treatments"',
    'href="ent-nose-sinus.html"': 'href="#ent-treatments"',
    'href="ent-throat-voice.html"': 'href="#ent-treatments"',
    'href="ent-pediatric.html"': 'href="#ent-treatments"',
    'href="#book-appointment" class="service-link">Explore Details →': 'href="#book-appointment" class="service-link">Consult Specialist →'
}

for k, v in replacements.items():
    c = c.replace(k, v)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(c)

print('Updated index.html successfully!')
