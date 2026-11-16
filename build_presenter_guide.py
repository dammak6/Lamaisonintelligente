# build_presenter_guide.py
# Générateur du Guide Scénique Officiel en PDF pour Mahmoud Dammak et Louay Kouki
# "LA MAISON INTELLIGENTE" - Présentation interactive Français A2
# Architecture : 9 Pages dédiées (1 page de garde/commandes + 7 pages pour les 7 scènes + 1 page d'aide-mémoire express)

import os
import sys
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    """Canvas personnalisé ajoutant en-têtes et pied de page avec numérotation exacte 'Page X / 9'."""
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_header_footer(num_pages)
            super().showPage()
        super().save()

    def draw_header_footer(self, page_count):
        self.saveState()
        page_w, page_h = A4
        
        # En-tête supérieur (pages 2 et suivantes)
        if self._pageNumber > 1:
            self.setStrokeColor(colors.HexColor('#cbd5e1'))
            self.setLineWidth(0.6)
            self.line(14 * mm, page_h - 12 * mm, page_w - 14 * mm, page_h - 12 * mm)
            
            self.setFont("Helvetica-Bold", 8)
            self.setFillColor(colors.HexColor('#0f172a'))
            self.drawString(14 * mm, page_h - 10 * mm, "LA MAISON INTELLIGENTE")
            
            self.setFont("Helvetica", 8)
            self.setFillColor(colors.HexColor('#64748b'))
            self.drawString(55 * mm, page_h - 10 * mm, "— Guide Scénique Officiel (Français A2)")
            
            self.setFont("Helvetica-Bold", 8)
            self.setFillColor(colors.HexColor('#0284c7'))
            self.drawRightString(page_w - 14 * mm, page_h - 10 * mm, "Mahmoud Dammak & Louay Kouki")
        
        # Pied de page (toutes les pages)
        self.setStrokeColor(colors.HexColor('#e2e8f0'))
        self.setLineWidth(0.6)
        self.line(14 * mm, 11 * mm, page_w - 14 * mm, 11 * mm)
        
        self.setFont("Helvetica", 7.5)
        self.setFillColor(colors.HexColor('#64748b'))
        self.drawString(14 * mm, 7.5 * mm, "Présentation Orale 5 Min • Maison 3D Interactive en Direct • https://lamaisonintelligente.vercel.app/")
        
        self.setFont("Helvetica-Bold", 7.5)
        self.setFillColor(colors.HexColor('#0f172a'))
        page_str = f"Page {self._pageNumber} / {page_count}"
        self.drawRightString(page_w - 14 * mm, 7.5 * mm, page_str)
        
        self.restoreState()


def create_pdf(output_filename="LA_MAISON_INTELLIGENTE_PRESENTER_GUIDE.pdf"):
    # Marges : 14 mm gauche/droite, 15 mm haut/bas
    doc = SimpleDocTemplate(
        output_filename,
        pagesize=A4,
        leftMargin=14 * mm,
        rightMargin=14 * mm,
        topMargin=15 * mm,
        bottomMargin=15 * mm
    )

    styles = getSampleStyleSheet()

    # Palette graphique
    NAVY = colors.HexColor('#0f172a')
    CYAN = colors.HexColor('#0284c7')
    INDIGO = colors.HexColor('#4f46e5')
    DARK_BLUE = colors.HexColor('#1e293b')
    ACCENT_BG = colors.HexColor('#f0f9ff')
    BORDER_COLOR = colors.HexColor('#cbd5e1')

    # Styles typographiques
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=23,
        leading=26,
        textColor=NAVY,
        alignment=1
    )

    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=CYAN,
        alignment=1
    )

    h1_style = ParagraphStyle(
        'Heading1_Custom',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12.5,
        leading=16,
        textColor=NAVY,
        spaceBefore=0,
        spaceAfter=1
    )

    h2_style = ParagraphStyle(
        'Heading2_Custom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=12,
        textColor=CYAN,
        spaceBefore=0,
        spaceAfter=2
    )

    body_style = ParagraphStyle(
        'Body_Custom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=DARK_BLUE
    )

    body_bold = ParagraphStyle(
        'Body_Bold',
        parent=body_style,
        fontName='Helvetica-Bold'
    )

    dialogue_style = ParagraphStyle(
        'Dialogue_Text',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=13,
        textColor=colors.HexColor('#0f172a')
    )

    action_style = ParagraphStyle(
        'Action_Text',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=8,
        leading=10.5,
        textColor=colors.HexColor('#475569')
    )

    badge_dammak = ParagraphStyle(
        'BadgeDammak',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=9.5,
        textColor=colors.HexColor('#0369a1'),
        alignment=1
    )

    badge_louay = ParagraphStyle(
        'BadgeLouay',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=9.5,
        textColor=colors.HexColor('#4338ca'),
        alignment=1
    )

    badge_assistant = ParagraphStyle(
        'BadgeAssistant',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=9.5,
        textColor=colors.HexColor('#1d4ed8'),
        alignment=1
    )

    badge_sys = ParagraphStyle(
        'BadgeSys',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=9.5,
        textColor=colors.HexColor('#475569'),
        alignment=1
    )

    story = []

    # =========================================================================
    # PAGE 1 — FICHE SIGNALÉTIQUE, CONTRÔLES & 4 RÈGLES D'OR
    # =========================================================================
    story.append(Spacer(1, 2 * mm))
    story.append(Paragraph("LA MAISON INTELLIGENTE", title_style))
    story.append(Spacer(1, 1 * mm))
    story.append(Paragraph("« Une maison qui pense, communique et agit »", subtitle_style))
    story.append(Spacer(1, 1 * mm))
    story.append(Paragraph("<b>LIVRET DE RÉPÉTITION ET GUIDE SCÉNIQUE OFFICIEL</b>", ParagraphStyle('SubSub', alignment=1, fontName='Helvetica-Bold', fontSize=9.5, textColor=colors.HexColor('#64748b'))))
    story.append(Spacer(1, 3 * mm))

    # Tableau d'identification
    info_data = [
        [
            Paragraph("<b>PRÉSENTATEURS</b>", body_bold),
            Paragraph("<b>Mahmoud Dammak</b> (Présentateur 1) &bull; <b>Louay Kouki</b> (Présentateur 2)", body_style)
        ],
        [
            Paragraph("<b>ASSISTANTE VOCALE</b>", body_bold),
            Paragraph("Voix invisible intégrée &bull; Voix humaine chaleureuse : <b>Microsoft Julie (fr-FR)</b>", body_style)
        ],
        [
            Paragraph("<b>DURÉE & NIVEAU</b>", body_bold),
            Paragraph("<b>5 minutes (300 secondes)</b> &bull; Français niveau <b>A2 authentique</b> (répartition 50/50 vérifiée)", body_style)
        ],
        [
            Paragraph("<b>APPLICATION EN DIRECT</b>", body_bold),
            Paragraph("Application web 3D Three.js &bull; <b>https://lamaisonintelligente.vercel.app/</b>", body_style)
        ]
    ]
    info_table = Table(info_data, colWidths=[42 * mm, 140 * mm])
    info_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), ACCENT_BG),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#bae6fd')),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#e0f2fe')),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(info_table)
    story.append(Spacer(1, 3 * mm))

    # Vue d'ensemble
    story.append(Paragraph("1. Vue d'Ensemble & Déroulement Général", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=CYAN, spaceBefore=1, spaceAfter=3))
    overview_text = (
        "Ce livret donne à <b>Mahmoud Dammak</b> et <b>Louay Kouki</b> la conduite exacte de leur présentation orale. "
        "Chaque réplique correspond rigoureusement au texte affiché dans le prompteur de l'application. "
        "Le vocabulaire est strictement calibré au niveau <b>A2</b> (phrases simples, présent, expressions usuelles). "
        "Les indications de clic permettent de synchroniser les paroles avec les animations 3D de la maison sans la moindre hésitation."
    )
    story.append(Paragraph(overview_text, body_style))
    story.append(Spacer(1, 3 * mm))

    # Tableau des commandes
    story.append(Paragraph("2. Guide des Commandes et Gestuelle Interactive", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=CYAN, spaceBefore=1, spaceAfter=3))
    controls_data = [
        [
            Paragraph("<b>ACTION</b>", body_bold),
            Paragraph("<b>COMMANDE SOURIS / CLAVIER</b>", body_bold),
            Paragraph("<b>EFFET & BONNE PRATIQUE</b>", body_bold)
        ],
        [
            Paragraph("<font color='#0284c7'><b>AVANCER D'UNE ÉTAPE</b></font>", body_style),
            Paragraph("<b>Clic GAUCHE</b> sur l'écran<br/>ou Touche <b>Flèche Droite &rarr;</b> / <b>Espace</b>", body_style),
            Paragraph("Passe à la réplique ou à la scène suivante. Cliquer n'importe où sur l'image.", body_style)
        ],
        [
            Paragraph("<font color='#b91c1c'><b>RECULER (ANNULATION)</b></font>", body_style),
            Paragraph("<b>Clic DROIT</b> sur l'écran<br/>ou Touche <b>Flèche Gauche &larr;</b>", body_style),
            Paragraph("Revient à l'étape précédente en cas de clic involontaire. Menu clic droit désactivé.", body_style)
        ],
        [
            Paragraph("<font color='#d97706'><b>REDÉMARRER LA SCÈNE</b></font>", body_style),
            Paragraph("Touche <b>R</b> ou bouton <b>Recommencer</b>", body_style),
            Paragraph("Remet la scène active à l'étape 0 et coupe tout audio en cours sans quitter la scène.", body_style)
        ],
        [
            Paragraph("<font color='#4338ca'><b>PLEIN ÉCRAN</b></font>", body_style),
            Paragraph("Touche <b>F</b> ou bouton <b>Agrandir</b>", body_style),
            Paragraph("Plein écran 16:9 haute définition, idéal sur le vidéoprojecteur de la classe.", body_style)
        ],
        [
            Paragraph("<font color='#059669'><b>OUVRIR LE SOUFFLEUR</b></font>", body_style),
            Paragraph("Bouton <b>« Texte A2 »</b> (en bas à droite)", body_style),
            Paragraph("Ouvre le carnet complet avec toutes les répliques en cas de trou de mémoire.", body_style)
        ]
    ]
    controls_table = Table(controls_data, colWidths=[40 * mm, 50 * mm, 92 * mm])
    controls_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#e2e8f0')),
        ('BOX', (0,0), (-1,-1), 1, BORDER_COLOR),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(controls_table)
    story.append(Spacer(1, 3 * mm))

    # Règles d'or
    rules_box = [
        [Paragraph("<b>LES 4 RÈGLES D'OR DU DIRECT :</b><br/>"
                   "1. <b>Attendre la voix de l'assistante</b> : Ne jamais cliquer pendant que l'assistante parle (Scène 1, 3 et 7).<br/>"
                   "2. <b>Récupération en cas d'erreur</b> : Si vous cliquez deux fois trop vite, faites immédiatement un <b>Clic Droit</b>.<br/>"
                   "3. <b>L'accessoire smartphone (Scène 3)</b> : Mahmoud utilise son vrai téléphone portable devant la classe.<br/>"
                   "4. <b>Le contact avec le public</b> : Regardez la classe avec le sourire, ne gardez pas les yeux fixés sur l'écran.", body_style)]
    ]
    rules_table = Table(rules_box, colWidths=[182 * mm])
    rules_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#fef3c7')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#f59e0b')),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(rules_table)
    story.append(PageBreak())

    # Helper de rendu d'une étape scénique
    def stage_card(stage_idx, step_name, speaker_type, speaker_label, spoken_text, click_type, click_desc, acting_cue, partner_action):
        if speaker_type == 'dammak':
            badge_p = Paragraph(f"<b>{speaker_label.upper()}</b><br/><font size=7 color='#0369a1'>PRÉSENTATEUR 1</font>", badge_dammak)
            bg_badge = colors.HexColor('#e0f2fe')
        elif speaker_type == 'louay':
            badge_p = Paragraph(f"<b>{speaker_label.upper()}</b><br/><font size=7 color='#4338ca'>PRÉSENTATEUR 2</font>", badge_louay)
            bg_badge = colors.HexColor('#ede9fe')
        elif speaker_type == 'assistant':
            badge_p = Paragraph(f"<b>{speaker_label.upper()}</b><br/><font size=7 color='#1d4ed8'>VOIX JULIE</font>", badge_assistant)
            bg_badge = colors.HexColor('#dbeafe')
        else:
            badge_p = Paragraph(f"<b>{speaker_label.upper()}</b><br/><font size=7 color='#64748b'>SYSTÈME</font>", badge_sys)
            bg_badge = colors.HexColor('#f1f5f9')

        if click_type == 'CLICK':
            click_tag = "<font color='#059669'><b>[CLIC GAUCHE &rarr;]</b></font>"
        elif click_type == 'WAIT':
            click_tag = "<font color='#d97706'><b>[ATTENDRE &bull; NE PAS CLIQUER]</b></font>"
        elif click_type == 'START':
            click_tag = "<font color='#0284c7'><b>[CLIC DÉPART]</b></font>"
        else:
            click_tag = "<font color='#64748b'><b>[FIN DE SCÈNE]</b></font>"

        row1 = [
            badge_p,
            Paragraph(f"<b>Étape {stage_idx} : {step_name}</b> &bull; {click_tag} <font color='#334155'>{click_desc}</font>", body_style)
        ]
        
        content = []
        if spoken_text:
            content.append(Paragraph(f"<b>Parole :</b> <font size=9.5 color='#0f172a'><b>{spoken_text}</b></font>", dialogue_style))
        if acting_cue:
            content.append(Paragraph(f"<b>Conseil de jeu :</b> <font color='#475569'>{acting_cue}</font>", action_style))
        if partner_action:
            content.append(Paragraph(f"<b>Action du coéquipier :</b> <font color='#475569'>{partner_action}</font>", action_style))

        row2 = [
            "",
            content
        ]

        t = Table([row1, row2], colWidths=[36 * mm, 146 * mm])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (0,0), bg_badge),
            ('BACKGROUND', (1,0), (1,0), colors.HexColor('#f8fafc')),
            ('BACKGROUND', (0,1), (-1,1), colors.white),
            ('BOX', (0,0), (-1,-1), 0.75, colors.HexColor('#cbd5e1')),
            ('LINEBELOW', (0,0), (-1,0), 0.5, colors.HexColor('#e2e8f0')),
            ('SPAN', (0,0), (0,1)),
            ('TOPPADDING', (0,0), (-1,-1), 3),
            ('BOTTOMPADDING', (0,0), (-1,-1), 3),
            ('LEFTPADDING', (0,0), (-1,-1), 5),
            ('RIGHTPADDING', (0,0), (-1,-1), 5),
        ]))
        return t

    # =========================================================================
    # PAGE 2 — SCÈNE 01 : OUVERTURE & ÉVEIL DE LA MAISON
    # =========================================================================
    story.append(Paragraph("SCÈNE 01 — OUVERTURE & ÉVEIL DE LA MAISON", h1_style))
    story.append(Paragraph("<b>Durée : 30 secondes</b> &bull; <i>Écran sombre &rarr; Carillon d'éveil &rarr; Dialogue d'accueil chaleureux avec l'assistante</i>", h2_style))
    story.append(HRFlowable(width="100%", thickness=1, color=CYAN, spaceBefore=1, spaceAfter=4))

    story.append(stage_card(
        stage_idx=0,
        step_name="La maison endormie",
        speaker_type="system",
        speaker_label="Action Scène",
        spoken_text="",
        click_type="START",
        click_desc="Faire un Clic Gauche n'importe où sur l'écran pour réveiller la maison.",
        acting_cue="Mahmoud et Louay sont debout face à la classe, silencieux et souriants.",
        partner_action="Mahmoud et Louay attendent le clic initial."
    ))
    story.append(Spacer(1, 2 * mm))

    story.append(stage_card(
        stage_idx=1,
        step_name="Accueil de l'Assistante",
        speaker_type="assistant",
        speaker_label="Assistante",
        spoken_text="« Bonjour Mahmoud ! Bonjour Louay ! Bienvenue chez vous. Tout est prêt ! »",
        click_type="WAIT",
        click_desc="Attendre que l'assistante ait terminé sa phrase. Les lumières s'allument.",
        acting_cue="Sourire en entendant vos prénoms prononcés par la voix douce de l'assistante.",
        partner_action="Louay et Mahmoud se tournent vers le public ensemble."
    ))
    story.append(Spacer(1, 2 * mm))

    story.append(stage_card(
        stage_idx=2,
        step_name="Mahmoud lance la présentation",
        speaker_type="dammak",
        speaker_label="Mahmoud",
        spoken_text="« Bonjour à tous ! Merci l'assistante. Avec Louay Kouki, nous vous présentons notre maison intelligente. Alors, comment ça marche ? »",
        click_type="CLICK",
        click_desc="Cliquer une fois après avoir posé la question.",
        acting_cue="Salue la classe d'un geste amical et regarde l'écran 3D pour poser la question.",
        partner_action="Louay regarde la classe et acquiesce avec le sourire."
    ))
    story.append(Spacer(1, 2 * mm))

    story.append(stage_card(
        stage_idx=3,
        step_name="Explication de l'Assistante",
        speaker_type="assistant",
        speaker_label="Assistante",
        spoken_text="« C'est très simple. Vous pouvez commander la maison avec votre téléphone ou avec votre voix. »",
        click_type="WAIT",
        click_desc="Attendre la fin de la voix de l'assistante (durée : ~4 secondes).",
        acting_cue="Écouter l'assistante avec intérêt.",
        partner_action="Mahmoud montre discrètement son smartphone."
    ))
    story.append(Spacer(1, 2 * mm))

    story.append(stage_card(
        stage_idx=4,
        step_name="Louay invite à la découverte",
        speaker_type="louay",
        speaker_label="Louay",
        spoken_text="« Exactement ! Aujourd'hui, avec Mahmoud Dammak, nous allons tout vous montrer en direct. C'est parti ! »",
        click_type="CLICK",
        click_desc="Cliquer une fois pour passer à la Scène 2 (Définition).",
        acting_cue="Ton très dynamique et enthousiaste. Geste d'ouverture des bras vers la classe.",
        partner_action="Mahmoud se prépare pour la définition."
    ))
    story.append(PageBreak())

    # =========================================================================
    # PAGE 3 — SCÈNE 02 : QU'EST-CE QU'UNE MAISON INTELLIGENTE ?
    # =========================================================================
    story.append(Paragraph("SCÈNE 02 — QU'EST-CE QU'UNE MAISON INTELLIGENTE ?", h1_style))
    story.append(Paragraph("<b>Durée : 40 secondes</b> &bull; <i>Définition centrale claire &bull; Les 3 piliers (Appareils, Réseau sans fil, Contrôle)</i>", h2_style))
    story.append(HRFlowable(width="100%", thickness=1, color=CYAN, spaceBefore=1, spaceAfter=4))

    story.append(stage_card(
        stage_idx=0,
        step_name="La grande question",
        speaker_type="louay",
        speaker_label="Louay",
        spoken_text="« Pour commencer, posons une question simple : qu'est-ce qu'une maison intelligente ? »",
        click_type="CLICK",
        click_desc="Cliquer pour afficher la bannière de citation centrale.",
        acting_cue="Pose la question avec clarté en fixant la classe pour capter toute leur attention.",
        partner_action="Mahmoud prend la parole en enchaînant naturellement."
    ))
    story.append(Spacer(1, 3 * mm))

    story.append(stage_card(
        stage_idx=1,
        step_name="La définition centrale",
        speaker_type="dammak",
        speaker_label="Mahmoud",
        spoken_text="« C'est une maison avec des appareils simples qui nous aident tous les jours. »",
        click_type="CLICK",
        click_desc="Cliquer pour faire apparaître les 3 cartes des piliers.",
        acting_cue="Diction posée, insiste bien sur les mots 'appareils simples' et 'tous les jours'.",
        partner_action="Louay montre la bannière à l'écran."
    ))
    story.append(Spacer(1, 3 * mm))

    story.append(stage_card(
        stage_idx=2,
        step_name="Les trois éléments importants",
        speaker_type="louay",
        speaker_label="Louay",
        spoken_text="« Il y a trois éléments : des appareils dans les pièces, le Wi-Fi pour communiquer, et notre voix pour commander. »",
        click_type="CLICK",
        click_desc="Cliquer pour illuminer le pilier 3 (contrôle au smartphone).",
        acting_cue="Compte sur ses doigts : 1 (appareils), 2 (Wi-Fi), 3 (voix). Geste très visuel !",
        partner_action="Mahmoud sort son smartphone de sa poche."
    ))
    story.append(Spacer(1, 3 * mm))

    story.append(stage_card(
        stage_idx=3,
        step_name="Commander facilement",
        speaker_type="dammak",
        speaker_label="Mahmoud",
        spoken_text="« C'est très facile : on commande tout avec son téléphone portable ou simplement en parlant ! »",
        click_type="CLICK",
        click_desc="Cliquer une fois pour passer à la Scène 3 (Démonstrations 3D).",
        acting_cue="Lève son smartphone devant la classe avec le sourire.",
        partner_action="Louay se tourne vers l'écran pour introduire la maquette 3D."
    ))
    story.append(PageBreak())

    # =========================================================================
    # PAGE 4 — SCÈNE 03 : DÉMONSTRATION DES 5 APPAREILS EN 3D
    # =========================================================================
    story.append(Paragraph("SCÈNE 03 — DÉMONSTRATION DES 5 APPAREILS EN 3D", h1_style))
    story.append(Paragraph("<b>Durée : 60 secondes</b> &bull; <i>Maison 3D interactive &bull; Climax théâtral : commande groupée au smartphone</i>", h2_style))
    story.append(HRFlowable(width="100%", thickness=1, color=CYAN, spaceBefore=1, spaceAfter=3))

    story.append(stage_card(
        stage_idx=0,
        step_name="Vue générale des 5 appareils",
        speaker_type="dammak",
        speaker_label="Mahmoud",
        spoken_text="« Regardons notre maison en 3D. Voici cinq appareils très pratiques pour la vie de tous les jours. »",
        click_type="CLICK",
        click_desc="Cliquer pour zoomer sur le premier appareil (le haut-parleur).",
        acting_cue="Pointe la maison 3D à l'écran. Laisse le public admirer l'architecture ouverte.",
        partner_action="Louay s'avance vers l'écran pour détailler l'enceinte."
    ))
    story.append(Spacer(1, 1.5 * mm))

    story.append(stage_card(
        stage_idx=1,
        step_name="Le Haut-parleur intelligent",
        speaker_type="louay",
        speaker_label="Louay",
        spoken_text="« Premier appareil : le haut-parleur intelligent. Il écoute notre voix, donne la météo et met de la musique. »",
        click_type="CLICK",
        click_desc="Cliquer pour passer au 2e appareil (la cafetière). L'onde sonore pulse.",
        acting_cue="Montre le salon. Fait le geste de quelqu'un qui écoute de la musique relaxante.",
        partner_action="Mahmoud sourit et prépare l'étape du café."
    ))
    story.append(Spacer(1, 1.5 * mm))

    story.append(stage_card(
        stage_idx=2,
        step_name="La Machine à Café",
        speaker_type="dammak",
        speaker_label="Mahmoud",
        spoken_text="« Deuxième appareil : la machine à café. Le café coule tout seul avant même de sortir du lit ! »",
        click_type="CLICK",
        click_desc="Cliquer pour lancer l'interaction avec le téléphone portable.",
        acting_cue="Ton complice. Fait semblant de savourer l'arôme d'un café chaud au réveil.",
        partner_action="Louay regarde Mahmoud avec amusement."
    ))
    story.append(Spacer(1, 1.5 * mm))

    story.append(stage_card(
        stage_idx=3,
        step_name="Le Test au Téléphone",
        speaker_type="louay",
        speaker_label="Louay",
        spoken_text="« Maintenant, le moment magique ! Mahmoud Dammak va donner un seul ordre avec son téléphone portable. »",
        click_type="CLICK",
        click_desc="Cliquer pour afficher la simulation du téléphone portable sur l'écran.",
        acting_cue="Passe la main à Mahmoud en le désignant. Crée le suspense !",
        partner_action="Mahmoud tient son vrai téléphone bien haut face à la classe."
    ))
    story.append(Spacer(1, 1.5 * mm))

    story.append(stage_card(
        stage_idx=4,
        step_name="La Commande au Smartphone",
        speaker_type="dammak",
        speaker_label="Mahmoud",
        spoken_text="« Regardez mon téléphone portable. Je dis simplement à la maison : “Maison, prépare mon arrivée !” »",
        click_type="CLICK",
        click_desc="Cliquer pour envoyer l'ordre. La bulle bleue glisse à droite.",
        acting_cue="Parle directement dans son smartphone face au public comme en direct.",
        partner_action="Louay pointe la maison 3D pour que tout le monde voie la réaction."
    ))
    story.append(Spacer(1, 1.5 * mm))

    story.append(stage_card(
        stage_idx=5,
        step_name="Réaction coordonnée en direct",
        speaker_type="assistant",
        speaker_label="Assistante",
        spoken_text="« Bien sûr ! J'allume les lumières, j'ouvre les rideaux et je mets la climatisation. »",
        click_type="WAIT",
        click_desc="ATTENDRE ! Ne pas cliquer ! Les lumières s'allument, rideaux montent, clim s'active.",
        acting_cue="Silence sur scène ! Laisser résonner la voix et admirer la maison s'animer toute seule.",
        partner_action="Mahmoud et Louay regardent la maison réagir avec émerveillement."
    ))
    story.append(Spacer(1, 1.5 * mm))

    story.append(stage_card(
        stage_idx=6,
        step_name="Bilan de la Démonstration",
        speaker_type="louay",
        speaker_label="Louay",
        spoken_text="« En deux secondes : les lampes s'allument, les rideaux montent et la climatisation souffle de l'air frais ! »",
        click_type="CLICK",
        click_desc="Cliquer une fois pour passer à la Scène 4 (Le Réseau).",
        acting_cue="Récapitule avec fierté et dynamisme. Conclut la démonstration avec le sourire.",
        partner_action="Mahmoud range calmement son téléphone portable."
    ))
    story.append(PageBreak())

    # =========================================================================
    # PAGE 5 — SCÈNE 04 : COMMENT COMMUNIQUENT LES APPAREILS ?
    # =========================================================================
    story.append(Paragraph("SCÈNE 04 — COMMENT COMMUNIQUENT LES APPAREILS ?", h1_style))
    story.append(Paragraph("<b>Durée : 45 secondes</b> &bull; <i>Schéma réseau pédagogique &bull; Le voyage sans fil d'un ordre (Wi-Fi, Bluetooth, Internet)</i>", h2_style))
    story.append(HRFlowable(width="100%", thickness=1, color=CYAN, spaceBefore=1, spaceAfter=4))

    story.append(stage_card(
        stage_idx=0,
        step_name="Le mystère du sans-fil",
        speaker_type="louay",
        speaker_label="Louay",
        spoken_text="« Mais comment ces appareils se parlent-ils sans aucun fil dans la maison ? »",
        click_type="CLICK",
        click_desc="Cliquer pour illuminer l'Étape 1 (L'Utilisateur).",
        acting_cue="Pose la question avec curiosité en montrant le schéma sans fil à l'écran.",
        partner_action="Mahmoud s'apprête à expliquer la première étape."
    ))
    story.append(Spacer(1, 3 * mm))

    story.append(stage_card(
        stage_idx=1,
        step_name="Étape 1 : On donne un ordre",
        speaker_type="dammak",
        speaker_label="Mahmoud",
        spoken_text="« C'est très simple ! D'abord, on parle à l'appareil ou on appuie sur son téléphone portable. »",
        click_type="CLICK",
        click_desc="Cliquer pour illuminer l'Étape 2 (Le Réseau sans fil).",
        acting_cue="Explique la première étape avec clarté.",
        partner_action="Louay suit du regard le signal traverser l'écran."
    ))
    story.append(Spacer(1, 3 * mm))

    story.append(stage_card(
        stage_idx=2,
        step_name="Étape 2 : Le voyage dans l'air",
        speaker_type="louay",
        speaker_label="Louay",
        spoken_text="« Ensuite, le message voyage dans l'air grâce au Wi-Fi de la maison ou avec Internet dehors. »",
        click_type="CLICK",
        click_desc="Cliquer pour déclencher l'Étape 3 (L'Appareil agit).",
        acting_cue="Fait un geste ondulé de la main pour symboliser les ondes invisibles du Wi-Fi.",
        partner_action="Mahmoud pointe l'appareil récepteur."
    ))
    story.append(Spacer(1, 3 * mm))

    story.append(stage_card(
        stage_idx=3,
        step_name="Étape 3 : L'appareil agit",
        speaker_type="dammak",
        speaker_label="Mahmoud",
        spoken_text="« Enfin, l'appareil reçoit le message tout de suite et il agit : la lumière s'allume ou le café coule ! »",
        click_type="CLICK",
        click_desc="Cliquer une fois pour passer à la Scène 5 (Les Avantages).",
        acting_cue="Tape dans ses mains pour marquer la rapidité instantanée de l'action.",
        partner_action="Louay approuve d'un signe de tête."
    ))
    story.append(PageBreak())

    # =========================================================================
    # PAGE 6 — SCÈNE 05 : LES 5 GRANDS AVANTAGES
    # =========================================================================
    story.append(Paragraph("SCÈNE 05 — LES 5 GRANDS AVANTAGES", h1_style))
    story.append(Paragraph("<b>Durée : 45 secondes</b> &bull; <i>Bénéfices du quotidien &bull; Interaction participative à main levée avec la classe</i>", h2_style))
    story.append(HRFlowable(width="100%", thickness=1, color=CYAN, spaceBefore=1, spaceAfter=4))

    story.append(stage_card(
        stage_idx=0,
        step_name="Pourquoi une maison intelligente ?",
        speaker_type="dammak",
        speaker_label="Mahmoud",
        spoken_text="« Quels sont les grands avantages ? Nous avons choisi cinq points importants. »",
        click_type="CLICK",
        click_desc="Cliquer pour afficher les cartes 1 (Temps) et 2 (Confort).",
        acting_cue="Ton affirmatif et enthousiaste, introduit les points positifs.",
        partner_action="Louay se prépare à détailler les deux premiers points."
    ))
    story.append(Spacer(1, 2.5 * mm))

    story.append(stage_card(
        stage_idx=1,
        step_name="1. Gain de temps & 2. Confort",
        speaker_type="louay",
        speaker_label="Louay",
        spoken_text="« D'abord, on gagne du temps : moins de corvées répétitives. Ensuite, le confort : la maison s'adapte à nous. »",
        click_type="CLICK",
        click_desc="Cliquer pour afficher 3 (Économie) et 4 (Téléphone portable).",
        acting_cue="Montre les cartes 'Gain de temps' et 'Confort'.",
        partner_action="Mahmoud écoute et prépare la suite."
    ))
    story.append(Spacer(1, 2.5 * mm))

    story.append(stage_card(
        stage_idx=2,
        step_name="3. Économie d'énergie & 4. Téléphone",
        speaker_type="dammak",
        speaker_label="Mahmoud",
        spoken_text="« Puis, on économise l'électricité : les lampes s'éteignent seules. Et on peut tout vérifier avec son téléphone portable ! »",
        click_type="CLICK",
        click_desc="Cliquer pour illuminer la 5e carte (Sécurité).",
        acting_cue="Insiste sur la facture d'électricité réduite et le contrôle mobile.",
        partner_action="Louay présente la sécurité."
    ))
    story.append(Spacer(1, 2.5 * mm))

    story.append(stage_card(
        stage_idx=3,
        step_name="5. Sécurité de la maison",
        speaker_type="louay",
        speaker_label="Louay",
        spoken_text="« Enfin, la sécurité : la maison nous envoie une alerte directe sur le téléphone en cas de problème. »",
        click_type="CLICK",
        click_desc="Cliquer pour ouvrir la boîte de vote interactif à l'écran.",
        acting_cue="Ton rassurant, montre le bouclier de sécurité sur la carte.",
        partner_action="Mahmoud se tourne vers la classe pour la question."
    ))
    story.append(Spacer(1, 2.5 * mm))

    story.append(stage_card(
        stage_idx=4,
        step_name="Question pour la classe",
        speaker_type="dammak",
        speaker_label="Mahmoud",
        spoken_text="« Une question pour vous tous : qui aimerait vivre dans une maison comme celle-ci ? Levez la main ! »",
        click_type="CLICK",
        click_desc="Attendre 3-4 secondes en comptant les mains levées, puis cliquer pour la Scène 6.",
        acting_cue="Lève la main en souriant et compte à voix haute : '1, 2, 5, 10 mains... Super !'",
        partner_action="Louay regarde les élèves, sourit et commente les réponses."
    ))
    story.append(PageBreak())

    # =========================================================================
    # PAGE 7 — SCÈNE 06 : LES INCONVÉNIENTS ET LES RISQUES
    # =========================================================================
    story.append(Paragraph("SCÈNE 06 — LES INCONVÉNIENTS ET LES RISQUES", h1_style))
    story.append(Paragraph("<b>Durée : 55 secondes</b> &bull; <i>Simulation de panne Wi-Fi en direct &bull; Prudence, données et conseils pratiques</i>", h2_style))
    story.append(HRFlowable(width="100%", thickness=1, color=CYAN, spaceBefore=1, spaceAfter=4))

    story.append(stage_card(
        stage_idx=0,
        step_name="Attention aux risques",
        speaker_type="louay",
        speaker_label="Louay",
        spoken_text="« Mais attention : il y a aussi de vrais problèmes et des risques à connaître. »",
        click_type="CLICK",
        click_desc="Cliquer pour déclencher l'alerte rouge de panne Wi-Fi.",
        acting_cue="Adopte un ton sérieux et attentif. Regarde la classe avec gravité.",
        partner_action="Mahmoud prend une attitude sérieuse et pointe l'alerte."
    ))
    story.append(Spacer(1, 2.5 * mm))

    story.append(stage_card(
        stage_idx=1,
        step_name="1. La panne d'Internet (Simulation)",
        speaker_type="dammak",
        speaker_label="Mahmoud",
        spoken_text="« Premier problème : la panne d'Internet. Si le Wi-Fi s'arrête ou s'il n'y a plus d'électricité, plus rien ne marche ! »",
        click_type="WAIT",
        click_desc="Le bandeau rouge clignote 3.5s. ATTENDRE la reconnexion automatique.",
        acting_cue="Montre l'écran : 'Regardez : voyant rouge, coupure du réseau !'",
        partner_action="Louay attend que le bandeau rouge disparaisse, puis prépare le clic."
    ))
    story.append(Spacer(1, 2.5 * mm))

    story.append(stage_card(
        stage_idx=2,
        step_name="2. La vie privée",
        speaker_type="louay",
        speaker_label="Louay",
        spoken_text="« Deuxième risque : la vie privée. Les micros et les caméras peuvent enregistrer nos habitudes à la maison. »",
        click_type="CLICK",
        click_desc="Cliquer pour afficher la sécurité du système et le coût élevé.",
        acting_cue="Pose l'index sur la tempe : invite à réfléchir aux données personnelles.",
        partner_action="Mahmoud confirme d'un hochement de tête appuyé."
    ))
    story.append(Spacer(1, 2.5 * mm))

    story.append(stage_card(
        stage_idx=3,
        step_name="3. La sécurité & 4. Le coût",
        speaker_type="dammak",
        speaker_label="Mahmoud",
        spoken_text="« Troisièmement, la sécurité : avec un mot de passe trop facile, quelqu'un peut entrer dans le système. Et quatrièmement : ces appareils coûtent cher ! »",
        click_type="CLICK",
        click_desc="Cliquer pour afficher le bandeau du conseil pratique des présentateurs.",
        acting_cue="Explique simplement le risque d'intrusion et le budget financier.",
        partner_action="Louay s'apprête à donner la recommandation positive."
    ))
    story.append(Spacer(1, 2.5 * mm))

    story.append(stage_card(
        stage_idx=4,
        step_name="Le conseil pratique",
        speaker_type="louay",
        speaker_label="Louay",
        spoken_text="« Notre conseil : choisissez un bon mot de passe et gardez toujours des boutons normaux sur les murs. »",
        click_type="CLICK",
        click_desc="Cliquer une fois pour passer à la Scène 7 (Conclusion & Débat).",
        acting_cue="Ton rassurant, positif et professionnel. Conclut la mise en garde avec maturité.",
        partner_action="Mahmoud se prépare pour le grand débat final."
    ))
    story.append(PageBreak())

    # =========================================================================
    # PAGE 8 — SCÈNE 07 : CONCLUSION & GRAND DÉBAT
    # =========================================================================
    story.append(Paragraph("SCÈNE 07 — CONCLUSION & GRAND DÉBAT", h1_style))
    story.append(Paragraph("<b>Durée : 25 secondes</b> &bull; <i>Extinction douce &bull; Dernière intervention vocale &bull; Lancement du débat ouvert</i>", h2_style))
    story.append(HRFlowable(width="100%", thickness=1, color=CYAN, spaceBefore=1, spaceAfter=4))

    story.append(stage_card(
        stage_idx=0,
        step_name="La maison s'endort",
        speaker_type="system",
        speaker_label="Action Scène",
        spoken_text="",
        click_type="CLICK",
        click_desc="Les lumières s'éteignent. Cliquer pour déclencher la question de l'assistante.",
        acting_cue="Silence dans la pièce. La maison 3D s'éteint doucement.",
        partner_action="Mahmoud et Louay se placent côte à côte face à la classe."
    ))
    story.append(Spacer(1, 3 * mm))

    story.append(stage_card(
        stage_idx=1,
        step_name="L'intervention de l'Assistante",
        speaker_type="assistant",
        speaker_label="Assistante",
        spoken_text="« Avant de terminer, j'ai une question pour vous… »",
        click_type="WAIT",
        click_desc="Attendre la voix de l'assistante (durée : ~3 secondes).",
        acting_cue="L'assistante lance la transition vers la réflexion finale.",
        partner_action="Mahmoud et Louay regardent le public avec le sourire."
    ))
    story.append(Spacer(1, 3 * mm))

    story.append(stage_card(
        stage_idx=2,
        step_name="La question de débat",
        speaker_type="dammak",
        speaker_label="Mahmoud",
        spoken_text="« Une maison intelligente : est-ce une bonne idée pour tout le monde ? Qu'en pensez-vous ? »",
        click_type="CLICK",
        click_desc="Cliquer pour afficher la carte finale des remerciements et crédits.",
        acting_cue="Pose la question avec conviction et regarde l'ensemble des élèves.",
        partner_action="Louay montre les colonnes POUR et CONTRE affichées sur l'écran."
    ))
    story.append(Spacer(1, 3 * mm))

    story.append(stage_card(
        stage_idx=3,
        step_name="Remerciements et ouverture",
        speaker_type="louay",
        speaker_label="Louay",
        spoken_text="« Mahmoud Dammak et moi vous remercions pour votre attention ! La parole est à vous ! »",
        click_type="WAIT",
        click_desc="FIN ! Laisser l'écran final affiché. La présentation est terminée avec succès.",
        acting_cue="Mahmoud et Louay saluent ensemble la classe et le professeur sous les applaudissements.",
        partner_action="Mahmoud et Louay animent ensemble les réponses du public."
    ))
    story.append(PageBreak())

    # =========================================================================
    # PAGE 9 — AIDE-MÉMOIRE EXPRESS POUR LE JOUR J (CHEAT SHEET)
    # =========================================================================
    story.append(Paragraph("AIDE-MÉMOIRE EXPRESS — LE JOUR DE LA PRÉSENTATION", h1_style))
    story.append(Paragraph("<b>Tableau synthétique pour répéter rapidement et ne jamais hésiter sur scène</b>", h2_style))
    story.append(HRFlowable(width="100%", thickness=1, color=CYAN, spaceBefore=1, spaceAfter=4))

    summary_data = [
        [
            Paragraph("<b>SCÈNE & TITRE</b>", body_bold),
            Paragraph("<b>QUI COMMENCE ?</b>", body_bold),
            Paragraph("<b>MOMENT DU CLIC</b>", body_bold),
            Paragraph("<b>RÈGLE CRITIQUE À RETENIR</b>", body_bold)
        ],
        [
            Paragraph("<b>01. Ouverture</b> (30s)", body_style),
            Paragraph("<font color='#1d4ed8'><b>Assistante (Julie)</b></font>", body_style),
            Paragraph("Clic initial de départ &bull; Clic après chaque phrase", body_style),
            Paragraph("<b>Attendre la voix</b> de l'assistante avant de parler.", body_style)
        ],
        [
            Paragraph("<b>02. Définition</b> (40s)", body_style),
            Paragraph("<font color='#4338ca'><b>Louay Kouki</b></font>", body_style),
            Paragraph("Clic pour la définition, puis pour les 3 piliers", body_style),
            Paragraph("Compter les 3 éléments sur les doigts.", body_style)
        ],
        [
            Paragraph("<b>03. 5 Appareils</b> (60s)", body_style),
            Paragraph("<font color='#0369a1'><b>Mahmoud Dammak</b></font>", body_style),
            Paragraph("Clic sur chaque appareil &bull; Clic ordre smartphone", body_style),
            Paragraph("<b>NE PAS CLIQUER</b> pendant la réponse vocale de la maison !", body_style)
        ],
        [
            Paragraph("<b>04. Réseau</b> (45s)", body_style),
            Paragraph("<font color='#4338ca'><b>Louay Kouki</b></font>", body_style),
            Paragraph("Clic à chaque flèche du schéma (3 étapes)", body_style),
            Paragraph("Montrer la transmission sans fil dans l'air.", body_style)
        ],
        [
            Paragraph("<b>05. Avantages</b> (45s)", body_style),
            Paragraph("<font color='#0369a1'><b>Mahmoud Dammak</b></font>", body_style),
            Paragraph("Clic pour afficher les cartes 2 par 2", body_style),
            Paragraph("Faire lever la main à la classe et compter les voix !", body_style)
        ],
        [
            Paragraph("<b>06. Risques</b> (55s)", body_style),
            Paragraph("<font color='#4338ca'><b>Louay Kouki</b></font>", body_style),
            Paragraph("Clic déclenche le glitch Wi-Fi rouge", body_style),
            Paragraph("Attendre 3.5s que la panne simulée se termine.", body_style)
        ],
        [
            Paragraph("<b>07. Débat</b> (25s)", body_style),
            Paragraph("<font color='#1d4ed8'><b>Assistante (Julie)</b></font>", body_style),
            Paragraph("Clic pour la question, puis pour remerciements", body_style),
            Paragraph("Saluer ensemble et ouvrir les questions de la classe.", body_style)
        ]
    ]

    summary_table = Table(summary_data, colWidths=[38 * mm, 38 * mm, 50 * mm, 56 * mm])
    summary_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#0f172a')),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('BOX', (0,0), (-1,-1), 1, BORDER_COLOR),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor('#f8fafc')]),
        ('TOPPADDING', (0,0), (-1,-1), 3.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3.5),
        ('LEFTPADDING', (0,0), (-1,-1), 5),
        ('RIGHTPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(summary_table)
    story.append(Spacer(1, 3 * mm))

    # Récapitulatif des phrases phares
    story.append(Paragraph("Phrases Clés Mémorisables des Deux Orateurs :", h2_style))
    phrases_box = [
        [
            Paragraph("<b>MAHMOUD DAMMAK (PRÉSENTATEUR 1) :</b><br/>"
                      "&bull; <i>« Bonjour à tous ! Avec Louay Kouki, nous vous présentons notre maison intelligente. Alors, comment ça marche ? »</i><br/>"
                      "&bull; <i>« C'est une maison avec des appareils simples qui nous aident tous les jours. »</i><br/>"
                      "&bull; <i>« Regardez mon téléphone portable. Je dis simplement à la maison : “Maison, prépare mon arrivée !” »</i><br/>"
                      "&bull; <i>« Une maison intelligente : est-ce une bonne idée pour tout le monde ? Qu'en pensez-vous ? »</i>", body_style),
            Paragraph("<b>LOUAY KOUKI (PRÉSENTATEUR 2) :</b><br/>"
                      "&bull; <i>« Exactement ! Aujourd'hui, avec Mahmoud Dammak, nous allons tout vous montrer en direct. C'est parti ! »</i><br/>"
                      "&bull; <i>« Il y a trois éléments : des appareils dans les pièces, le Wi-Fi pour communiquer, et notre voix pour commander. »</i><br/>"
                      "&bull; <i>« En deux secondes : les lampes s'allument, les rideaux montent et la climatisation souffle de l'air frais ! »</i><br/>"
                      "&bull; <i>« Mahmoud Dammak et moi vous remercions pour votre attention ! La parole est à vous ! »</i>", body_style)
        ]
    ]
    phrases_table = Table(phrases_box, colWidths=[90 * mm, 92 * mm])
    phrases_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (0,0), colors.HexColor('#f0f9ff')),
        ('BACKGROUND', (1,0), (1,0), colors.HexColor('#faf5ff')),
        ('BOX', (0,0), (-1,-1), 1, BORDER_COLOR),
        ('INNERGRID', (0,0), (-1,-1), 1, BORDER_COLOR),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(phrases_table)
    story.append(Spacer(1, 3 * mm))

    # Boîte de protocole d'urgence
    panic_box = [
        [Paragraph("<b>PROTOCOLE DE SÉCURITÉ EN CAS D'IMPRÉVU :</b><br/>"
                   "&bull; <b>Clic trop rapide ou saut d'étape</b> : Faire immédiatement un <b>Clic DROIT</b> (ou touche Flèche Gauche &larr;) pour revenir en arrière.<br/>"
                   "&bull; <b>Désynchronisation complète</b> : Appuyer sur la touche <b>R</b> pour réinitialiser la scène au début sans stress.<br/>"
                   "&bull; <b>Problème d'enceinte / audio muet</b> : Les sous-titres s'affichent toujours en grand. Vous pouvez lire la phrase de l'assistante directement.", body_style)]
    ]
    panic_table = Table(panic_box, colWidths=[182 * mm])
    panic_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#f1f5f9')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#94a3b8')),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(panic_table)

    # Construction du document
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"PDF généré avec succès : {output_filename}")


if __name__ == "__main__":
    out_file = sys.argv[1] if len(sys.argv) > 1 else "LA_MAISON_INTELLIGENTE_PRESENTER_GUIDE.pdf"
    create_pdf(out_file)
