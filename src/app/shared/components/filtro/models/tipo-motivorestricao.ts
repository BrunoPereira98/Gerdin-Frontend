export class TipoMotivorestricao {

    static readonly bol: Boolean[] = [];

    static readonly SGI_CONT = new TipoMotivorestricao(1, 'Razão de indisponibilidade externa (SGI / CONTINGÊNCIA)',
        1, 'Razão de indisponibilidade externa (SGI / CONTINGÊNCIA)',
        'Motivadas por indisponibilidades em instalações externas às respectivas usinas sejam nas:\r\n(i) instalações de transmissão classificadas como Rede Básica; ou\r\n(ii) Demais Instalações de Transmissão – DITs no âmbito da distribuição.\r\nDessa forma, esta classificação não abarca instalações de uso exclusivo ou compartilhado do gerador, sob sua gestão ou de terceiros.\r\nNessa classificação, estariam incluídas as indisponibilidades de linhas de transmissão, transformadores, disjuntores e instalações de subestações em geral.',
        'Elétrico', true, 1, this.bol);

    static readonly CONT_FREQ = new TipoMotivorestricao(2, 'Razão energética (CONTROLE DE FREQUÊNCIA)',
        2, 'Razão energética (CONTROLE DE FREQUÊNCIA)',
        'Motivada pela impossibilidade de alocação de geração na carga.\r\nNessa classificação, estariam incluídas restrições de geração para efeitos de balanço carga e geração, desde que não motivadas pelas razões anteriores.',
        'Energético', true, 2, this.bol);

    static readonly SEM_REST = new TipoMotivorestricao(3, 'Sem Restrições',
        3, 'Sem Restrições',
        'Sem Restrições',
        'Sem Restrições', false, 3, this.bol);

    static readonly RESTRICAO = new TipoMotivorestricao(0, 'Restritos',
        0, 'Restritos',
        'Restritos',
        'Restritos', false, 3, this.bol);

    static readonly NORMAL = new TipoMotivorestricao(1, 'Razão de atendimento a requisitos de confiabilidade elétrica (OPERAÇÃO NORMAL)',
        1, 'Razão de atendimento a requisitos de confiabilidade elétrica (OPERAÇÃO NORMAL)',
        'Motivadas por razões de confiabilidade elétrica que não tenham origem em indisponibilidades de equipamentos do sistema de transmissão.\r\n* A Nota Técnica é um documento emitido pelas Unidades Organizacionais e destina-se a subsidiar as decisões da Agência.\r\nNessa classificação, estariam incluídas as situações de redução de geração devido ao atingimento de limite de linhas de transmissão, de carregamento de equipamentos, de requisitos de estabilidade dinâmica etc.',
        'Elétrico', true, 1, this.bol);

    Id: number;
    Description: string;
    IdTipoMotivorestricao: number;
    DescricaoTipoMotivorestricao: string;
    Observacao: string;
    Nome: string;
    Exibir: Boolean;
    Agrupador: number;
    AcaOperacaoLista: Boolean[];

    private constructor(Id: number,
                        Description: string,
                        IdTipoMotivorestricao: number,
                        DescricaoTipoMotivorestricao: string,
                        Observacao: string,
                        Nome: string,
                        Exibir: Boolean,
                        Agrupador: number,
                        AcaOperacaoLista: Boolean[]) {
        this.Id = Id;
        this.Description = Description;
        this.IdTipoMotivorestricao = IdTipoMotivorestricao;
        this.DescricaoTipoMotivorestricao = DescricaoTipoMotivorestricao;
        this.Observacao = Observacao;
        this.Nome = Nome;
        this.Exibir = Exibir;
        this.Agrupador = Agrupador;
        this.AcaOperacaoLista = AcaOperacaoLista;
    }
}
